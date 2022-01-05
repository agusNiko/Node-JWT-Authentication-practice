const express = require("express");
const app = express();

const users = [
  { id: "1", username: "john", password: "john1234", isAdmin: true },
  { id: "1", username: "anna", password: "anna1234", isAdmin: false },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
});

app.listen(5000, () => console.log("Backend is running!"));
