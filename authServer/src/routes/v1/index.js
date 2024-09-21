const express = require("express");
const passport = require("../../config/passport");
const {
  createUser,
  login,
  sendOtp,
  verifyOtp,
  googleCallback,
  getUser,
  updateUser,
  verifyToken,
  validEmail,
  changePassword,
  getUserById
} = require("../../controllers/user-controller");
const { authenticateToken } = require("../../middleware/authMiddleware");
const { CLIENT_LINK } = require("../../config/serverConfig");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/validateEmail", validEmail);
router.post("/change-password", changePassword);
router.patch("/update-user", updateUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get('/user-details', getUserById);
router.get("/user", authenticateToken, getUser);
router.get("/isAuthenticated", verifyToken);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_LINK}auth?error=Email used by another login method`,
  }),
  googleCallback
);

router.get('/ping', (req, res) => {
  console.log(`Ping received at ${new Date().toISOString()}`);
  res.json({ message: "Server is awake" });
});

module.exports = router;
