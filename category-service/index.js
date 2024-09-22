const express = require("express");
const app = express();

app.use((req, res, next) => {
  const userId = req.headers["x-user"];
  req.userId = userId;
  next();
});

app.get("/category-service", (req, res) => {
  res.send(`Hello User: ${req.userId} - Welcome to the Category Service`);
});

app.listen(3000, () => console.log("Category Service running on port 3000"));
