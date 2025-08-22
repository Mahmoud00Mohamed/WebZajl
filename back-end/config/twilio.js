// config/twilio.js
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

let client = null;

if (
  !accountSid ||
  !authToken ||
  !verifyServiceSid ||
  !accountSid.startsWith("AC")
) {
  console.warn(
    "Warning: Twilio credentials not properly configured. Phone verification will be disabled."
  );
} else {
  client = twilio(accountSid, authToken);
}

/**
 * إرسال رمز OTP إلى رقم الهاتف
 */
export const sendOTP = async (phoneNumber) => {
  try {
    if (!client || !verifyServiceSid) {
      throw new Error("Twilio not configured");
    }

    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    return {
      success: true,
      status: verification.status,
      sid: verification.sid,
    };
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send verification code");
  }
};

/**
 * التحقق من رمز OTP
 */
export const verifyOTP = async (phoneNumber, code) => {
  try {
    if (!client || !verifyServiceSid) {
      throw new Error("Twilio not configured");
    }

    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      });

    return {
      success: verificationCheck.status === "approved",
      status: verificationCheck.status,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return {
      success: false,
      status: "failed",
      error: error.message,
    };
  }
};

export default client;
