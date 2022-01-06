const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

const users = [
  { id: "1", username: "peter", password: "peter1234", isAdmin: true },
  { id: "1", username: "anna", password: "anna1234", isAdmin: false },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      "mySecretKey",
      {
        expiresIn: "20s",
      }
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("Username or password incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not Authenticated");
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("user has been deleted");
  } else {
    res.status(403).json("you are not allowed to delete this user");
  }
});

app.listen(5000, () => console.log("Backend is running!"));
