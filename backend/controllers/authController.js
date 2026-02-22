import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js"; // Brevo email utility

//  Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//  Register User (Customer or Admin)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body; // added adminKey

    //  Check admin secret key if role is admin
    if (role === "admin") {
      if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Invalid admin secret key" });
      }
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    if (user) {
      //  Send Welcome Email using Brevo
      try {
        await sendEmail({
          email: user.email,
          subject: "Welcome to Fruits Bounty",
          message: `<p>Hello ${user.name},</p>
                    <p>Welcome to Fruits Bounty! Your account has been successfully created.</p>
                    <p>- Fruits Bounty Team</p>`
        });
      } catch (err) {
        console.log("Error sending welcome email:", err.message);
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

//  Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `<p>Hello ${user.name},</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link expires in 10 minutes.</p>`
    });

    res.status(200).json({
      message: "Reset email sent"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send Password Reset Confirmation Email
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password has been reset",
        message: `<p>Hello ${user.name},</p>
                  <p>Your password has been successfully reset.</p>
                  <p>- Fruits Bounty Team</p>`
      });
    } catch (err) {
      console.log("Error sending password reset email:", err.message);
    }

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};