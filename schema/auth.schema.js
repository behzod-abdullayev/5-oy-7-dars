const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // match: [/^[a-zA-Z0-9]$/, "faqatgina raqam yoki harflarni kiritish mumkin"  ]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, "emailda kamida 10 ta belgi bo'lishi shart"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password kamida 8 ta belgidan iborat bo'lishi kerak"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "superadmin"],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
      default: "user",
    },
    otp: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpTime: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
