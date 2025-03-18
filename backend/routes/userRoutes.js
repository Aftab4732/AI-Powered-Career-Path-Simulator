
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// // Register route
// router.post("/register", async (req, res) => {
//    const { name, email, password } = req.body;

//    try {
//       const userExists = await User.findOne({ email });
//       if (userExists) return res.status(400).json({ message: "User already exists" });

//       const user = new User({ name, email, password });
//       await user.save();

//       res.status(201).json({ message: "User registered successfully" });
//    } catch (error) {
//       res.status(500).json({ error: error.message });
//    }
// });

// Login route
router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});
// Create User
router.post("/", async (req, res) => {
   try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Get All Users
router.get("/", async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;

