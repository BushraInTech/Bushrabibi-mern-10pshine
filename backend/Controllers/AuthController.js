const User = require("../Models/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const signup = async (req, res) => {
  console.log("🟢 Signup route hit");
  console.log("Body:", req.body);
  console.log("File:", req.file);

  try {
    const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

    // 1️⃣ Validate all fields
    if (!firstName || !lastName || !userEmail || !userPassword) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 2️⃣ Check if email already exists
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      console.log("❌ Email already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Save uploaded profile image (optional)
    let profileImagePath = "";
    if (req.file) {
      const uploadDir = path.join(__dirname, "../files");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, req.file.originalname);
      fs.writeFileSync(filePath, req.file.buffer);
      profileImagePath = `/files/${req.file.originalname}`;
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // 5️⃣ Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      userBio,
      userEmail,
      userMobile,
      userName,
      userPassword: hashedPassword,
      profileImage: profileImagePath,
    });

    await newUser.save();
    console.log("✅ User created:", newUser.userEmail);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });

    if (!user) return res.json({ status: "Error", getUser: false });

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordMatch) return res.json({ status: "Error", getUser: false });

    return res.json(user);
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };
