const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cookieParser());

// Logger Middleware – logs "Request Received" for every incoming request
app.use((req, res, next) => {
  console.log("Request Received");
  next();
});

// ─── Controllers ─────────────────────────────────────────────────────────────
const userController = (req, res) => {
  res.json({ name: "John Doe", role: "Student" });
};

// ─── Routes ──────────────────────────────────────────────────────────────────

// Route 1: Home Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Express Server" });
});

// Route 2: User Route (uses controller)
app.get("/user", userController);

// Route 4: Login Route – sets a cookie
app.get("/login", (req, res) => {
  res.cookie("user", "john", {
    httpOnly: true,   // prevents client-side JS access (more secure)
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  res.json({ success: true, message: "Cookie has been set", cookie: "user=john" });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
