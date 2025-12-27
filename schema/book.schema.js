const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    pages: {
      type: String,
      required: true,
    },
    pushlished_year: {
      type: Number,
      required: false,
      default: null,
      max: new Date().getFullYear(),
    },

    img_url: {
      type: String, 
      required: true,
      minlength: 10, // min → minlength
      trim: true,
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
    description: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    pushlished_home: {
      type: String,
      required: true,
      trim: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Auther",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookSchema = model("Book", Book);

module.exports = BookSchema;
