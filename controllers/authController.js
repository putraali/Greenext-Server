const bcrypt = require("bcrypt");
const db = require("../config/db");

const registerUser = async (req, res) => {
  const {
    username,
    password,
    email,
    role = "user",
    created_at,
    updated_at,
  } = req.body;

  // basic validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const queryCheckEmail = "SELECT * FROM users WHERE email = ?";

    //check if email already exist
    const [existingUser] = await db.query(queryCheckEmail, [email]);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user to database
    const query =
      "INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
    const result = await db.query(query, [
      username,
      email,
      hashedPassword,
      role,
    ]);
    res.status(200).json({
      success: true,
      message: "User successfully registered",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
};
