const Joi = require("joi");

exports.AuthorValidator = function (data) {
  const schema = Joi.object({
    full_name: Joi.string()
      .min(3)
      .pattern(new RegExp(`^[a-zA-Z ]{3,30}$`))
      .required(),
    birth_year: Joi.number()
      .max(new Date().getFullYear() - 15)
      .integer()
      .required(),
    death_year: Joi.string().max(new Date().getFullYear()).required(),
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
    bio: Joi.string().max(10000).required(),
    creativity: Joi.string().trim().max(1000).required(),
    region: Joi.string().trim().max(60).required(),
  });

  return schema.validate(data);
};
