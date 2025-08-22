//  routes/authRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  signup,
  verifyEmail,
  login,
  requestPasswordReset,
  resetPassword,
  resendCode,
  refreshAccessToken,
  logout,
  checkUsername,
  ping,
  sendPhoneVerification,
  verifyPhoneNumber,
  loginWithPhone,
  verifyPhoneLogin,
} from "../controllers/authController.js";
import passport from "../config/passport.js";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

// إعداد معدل التحديد للمسارات الحساسة (5 محاولات خلال 15 دقيقة)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5000, // عدد المحاولات القصوى
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
// تطبيق الـ Rate Limiting على المسارات الحساسة
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/password-reset", authLimiter, requestPasswordReset);
router.post("/verify-email", authLimiter, verifyEmail);
router.post("/resend-code", authLimiter, resendCode);
router.get("/check-username", checkUsername);
router.get("/google", googleAuth); // بدء عملية تسجيل الدخول بـ Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleAuthCallback // رد الاتصال بعد المصادقة
);
router.get("/ping", ping);
// باقي المسارات بدون Rate Limiting
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

// مسارات التحقق من الهاتف
router.post("/send-phone-verification", authMiddleware, sendPhoneVerification);
router.post("/verify-phone", authMiddleware, verifyPhoneNumber);
router.post("/login-phone", loginWithPhone);
router.post("/verify-phone-login", verifyPhoneLogin);

export default router;
