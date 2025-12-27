const Joi = require("joi");

exports.BookValidator = function (data) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .pattern(new RegExp(`^[a-zA-Z ]{2,150}$`))
      .required(),
    pages: Joi.number().min(3).integer().required(),
    pushlished_year: Joi.number().max(new Date().getFullYear()).integer().required(),
    img_url: Joi.string().uri().min(15).trim().required(),
    genre: Joi.string()
      .trim()
      .lowercase()
      .valid(
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
        "sport"
      )
      .max(30)
      .required(),
    period: Joi.string()
      .lowercase().valid(
        "jadid davri",
        "temuriylar davri",
        "sovet davri",
        "mustaqillik davri"
      )
      .required(),
    description: Joi.string().max(10000).required(),
    pushlished_home: Joi.string().trim().max(100).min(3).required(),
    author_id: Joi.string().trim().max(24).required(),
  });

  return schema.validate(data);
};
