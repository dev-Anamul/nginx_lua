const express = require("express");
const app = express();

app.use((req, _res, next) => {
  req.userId = req.headers["x-user"] || null;
  next();
});

app.get("/product-service", (req, res) => {
  res.send(`Hello User: ${req.userId} - Welcome to the product Service`);
});

app.listen(3001, () => console.log("Category Service running on port 3001"));
