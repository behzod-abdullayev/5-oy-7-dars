const citationSchema = require("../schema/citation.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");



// iqtibos qoshish
const addCitation = async (req, res, next) => {
  try {
    const {text, admin_id, book_id} = req.body;
 await citationSchema.create({text, admin_id, book_id});
    res.status(201).json({
      message: "iqtios muvaffaqiyatli qo'shildi",
    });
  } catch (error) {
  next(error)
  }
};

// iqtibosni yangilash
const updateCitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {text, admin_id, book_id} = req.body;
    const citation = await citationSchema.findById(id);

    if (!citation) {
      throw CustomErrorHandler.NotFound("citation not found");
    }
 await citationSchema.findByIdAndUpdate(id, {text, admin_id, book_id})

    res.status(200).json({
      message: "citation muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    next(error);
    res.status(400).json({ error: error.message });
  }
};

// iqtibosni o'chirish
const deleteCitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const citation = await citationSchema.findById(id);

    if (!citation) {
      throw CustomErrorHandler.NotFound("citation not found");
    }

    await citationSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "citation muvaffaqiyatli o'chirildi" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCitation,
  updateCitation,
  deleteCitation,
};
