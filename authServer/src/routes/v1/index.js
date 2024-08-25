const express = require('express');
const passport = require('../../config/passport');
const { createUser, login, sendOtp, verifyOtp, googleCallback, getUser, updateUser } = require('../../controllers/user-controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.post('/update-user', updateUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/user', authenticateToken, getUser);

// Google Authentication Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

module.exports = router;