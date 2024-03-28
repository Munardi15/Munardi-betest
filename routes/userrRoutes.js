const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  findUserByAccountNumber,
  findUserByIdentityNumber,
  getUserById,
  getUsers,
  updateUser,
} = require("../src/controller/userController");
const { generateToken, authenticateToken } = require("../src/middleware/auth");

router.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "admin123") {
    const token = generateToken({ username });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/users/account/:accountNumber", authenticateToken, findUserByAccountNumber);

router.get("/users/identity/:identityNumber", authenticateToken, findUserByIdentityNumber);

router.post("/users", authenticateToken, createUser);

router.get("/users", authenticateToken, getUsers);

router.get("/users/:id", authenticateToken, getUserById);

router.put("/users/:id", authenticateToken, updateUser);

router.delete("/users/:id", authenticateToken, deleteUser);

module.exports = router;
