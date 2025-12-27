const { Schema, model } = require("mongoose");

const Auther = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      unique: [true, "full name unique bolishi kerak"],
      set: (value) => value.trim(),
      minLength: [3, "ism kamida 3 ta harfdan iborat bo'lishi kerak"],
      maxLength: [25, "ism eng ko'pi 30 ta harfdan iborat bo'lishi kerak"],
      match: [/^[a-zA-z' ]+$/, "ism faqat harfdan iborat bolishi kerak"],
    },
    birth_year: {
      type: Number,
      required: true,
      max: [
        new Date().getFullYear() - 15,
        "adib kamida 15 yosh bo'lishi kerak",
      ],
    },
    death_year: {
      type: String,
      required: false,
      default: null,
      min: new Date().getFullYear(),
    },
    img_url: {
      type: String,
      required: true,
      min: 10,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
      set: (value) => value.toLowerCase(),
      enum: {
        values: [
          "action",
          "adventure",
          "comedy",
          "drama",
          "thriller",
          "horror",
          "sci-fi",
          "fantasy",
          "romance",
          "crime",
          "mystery",
          "animation",
          "documentary",
          "biography",
          "historical",
          "war",
          "western",
          "musical",
          "family",
          "sport",
        ],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
    },
    period: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
      enum: {
        values: [
          "jadid davri",
          "temuriylar davri",
          "sovet davri",
          "mustaqillik davri",
        ],
        message: `{VALUE} bunday davr qabul qilinmaydi. Davrlar quyidagilardan biri bo'ishi kerak: jadid davri, temuriylar davri, sovet davri, mustaqillik davri`,
      },
    },
    bio: {
      type: String,
      required: true,
      maxLength: 10000,
    },
    creativity: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000
    },
    region: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AutherSchema = model("Auther", Auther);

module.exports = AutherSchema;
