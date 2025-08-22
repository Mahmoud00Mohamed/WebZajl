import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRecaptcha } from "../../hooks/useRecaptcha";

const API_BASE_URL = "https://localhost:3002/api/auth";

const LoginForm: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();
  const { login, loginWithPhone } = useAuth();

  const { executeRecaptcha } = useRecaptcha({
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    action: "login",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get reCAPTCHA token for email login only
      let captchaToken = "dummy-captcha-token";
      if (loginMethod === "email") {
        captchaToken = await executeRecaptcha();
      }

      if (loginMethod === "email") {
        await login(formData.email, formData.password, captchaToken);
        navigate("/");
      } else {
        await loginWithPhone(formData.phoneNumber);
        navigate("/auth/verify-phone-login", {
          state: { phoneNumber: formData.phoneNumber },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    // إعادة توجيه مباشرة لـ Google OAuth في نفس الصفحة
    window.location.href = `${API_BASE_URL}/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isRtl ? "تسجيل الدخول" : "Sign In"}
          </h1>
          <p className="text-gray-600">
            {isRtl ? "مرحباً بك مرة أخرى" : "Welcome back"}
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              loginMethod === "email"
                ? "bg-white shadow-sm text-purple-600 font-medium"
                : "text-gray-600"
            }`}
          >
            <Mail size={16} className="inline mr-2 rtl:ml-2 rtl:mr-0" />
            {isRtl ? "بالإيميل" : "Email"}
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              loginMethod === "phone"
                ? "bg-white shadow-sm text-purple-600 font-medium"
                : "text-gray-600"
            }`}
          >
            <Phone size={16} className="inline mr-2 rtl:ml-2 rtl:mr-0" />
            {isRtl ? "بالهاتف" : "Phone"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginMethod === "email" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isRtl ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={
                      isRtl ? "أدخل بريدك الإلكتروني" : "Enter your email"
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isRtl ? "كلمة المرور" : "Password"}
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 rtl:pr-10 pr-12 rtl:pl-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={
                      isRtl ? "أدخل كلمة المرور" : "Enter your password"
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRtl ? "رقم الهاتف" : "Phone Number"}
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={isRtl ? "+966501234567" : "+966501234567"}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-600">
                {isRtl ? "تذكرني" : "Remember me"}
              </span>
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
            >
              {isRtl ? "نسيت كلمة المرور؟" : "Forgot password?"}
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {loginMethod === "email"
                    ? isRtl
                      ? "تسجيل الدخول"
                      : "Sign In"
                    : isRtl
                    ? "إرسال رمز التحقق"
                    : "Send Verification Code"}
                </span>
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </>
            )}
          </motion.button>
        </form>

        {loginMethod === "email" && (
          <>
            <div className="mt-6 text-center">
              <span className="text-gray-500 text-sm">
                {isRtl ? "أو" : "or"}
              </span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>
                {isRtl ? "تسجيل الدخول بجوجل" : "Continue with Google"}
              </span>
            </button>
          </>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {isRtl ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
            <Link
              to="/auth/signup"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              {isRtl ? "إنشاء حساب جديد" : "Sign up"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
