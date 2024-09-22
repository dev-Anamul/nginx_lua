FROM fabiocicerchia/nginx-lua
# FROM nginx:latest

# Install LuaRocks
RUN apk add --no-cache gcc musl-dev lua-dev luarocks

# Install lua-resty-http and lua-cjson
RUN luarocks install lua-resty-http
RUN luarocks install lua-cjson

# Copy your Lua scripts
COPY ./lua /etc/nginx/lua/
