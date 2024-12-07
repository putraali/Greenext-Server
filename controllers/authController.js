const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const {
    username,
    password,
    email,
    role = "user",
    created_at,
    updated_at,
  } = req.body;

  // console.log("Request Body:", req.body);

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
    res.status(201).json({
      success: true,
      message: "User successfully registered",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // check if user exist
    const findUserQuery = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.query(findUserQuery, [email]);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // generate jwt token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // set token in an HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.error("Error Logging in user", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token; // retrieve token from cookie using optional chaining

  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied : No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // veriy token
    req.user = decoded; // attach user info to request
    console.log("User : ", req.user);
    next();
  } catch (error) {
    console.error("Invalid Token", error.message);
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
};
