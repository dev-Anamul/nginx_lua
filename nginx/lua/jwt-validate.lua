
local http = require "resty.http"
local cjson = require "cjson"

-- Function to validate the JWT token
local function validate_token(token)
    local httpc = http.new()
    local res, err = httpc:request_uri("http://auth-server:4000/validate", {
        method = "POST",
        body = cjson.encode({ token = token }),
        headers = {
            ["Content-Type"] = "application/json",
        }
    })

    if not res then
        ngx.log(ngx.ERR, "Failed to contact authentication server: ", err)
        ngx.status = ngx.HTTP_INTERNAL_SERVER_ERROR
        ngx.say("Failed to contact authentication server")
        return false
    end

    local res_body = res.body
    local data = cjson.decode(res_body)

    if res.status == 200 then
        ngx.log(ngx.WARN, res)
        ngx.req.set_header("x-user", data.username)
        return true  -- Token is valid
    else
        ngx.log(ngx.WARN, "Invalid token")
        ngx.status = ngx.HTTP_UNAUTHORIZED
        ngx.say("Invalid token")
        return false
    end
end

-- Get the Authorization header
local auth_header = ngx.var.http_Authorization
if not auth_header then
    ngx.log(ngx.WARN, "Missing token")
    ngx.status = ngx.HTTP_UNAUTHORIZED
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

local token = string.sub(auth_header, 8)  -- Remove "Bearer " prefix

-- Validate the token
if not validate_token(token) then
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

ngx.log(ngx.INFO, "JWT validated successfully")

