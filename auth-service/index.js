const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(express.json());

const users = [
  { id: 1, username: "user1", password: bcrypt.hashSync("password1", 8) },
  { id: 2, username: "user2", password: bcrypt.hashSync("password2", 8) },
];

const secretKey = "super_secret_key"; // Your secret key for signing JWTs

// Login endpoint to authenticate the user and issue a JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Sign the JWT
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  return res.json({ token });
});

// Protected route for testing JWT
app.post("/validate", (req, res) => {
  const { token } = req.body || {};

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    return res.status(200).json({
      message: `Hello, ${decoded.username}`,
      username: decoded.username,
    });
  });
});

app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
