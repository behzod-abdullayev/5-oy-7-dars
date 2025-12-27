const Book = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

// Barcha kitoblarni olish
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("author_id", "-_id");
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Bitta kitobni ID bo‘yicha olish
const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Yangi kitob qo‘shish
const addBook = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      pushlished_year,
      img_url,
      description,
      genre,
      period,
      pushlished_home,
      author_id,
    } = req.body;

    const newBook = await Book.create({
      title,
      pages,
      pushlished_year,
      img_url,
      description,
      genre,
      period,
      pushlished_home,
      author_id,
    });

    res.status(201).json({
      message: "Kitob muvaffaqiyatli qo‘shildi",
      book: newBook,
    });
  } catch (error) {
    next(error);
    res.status(400).json({ error: error.message });
  }
};

// Kitobni yangilash
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      pages,
      pushlished_year,
      img_url,
      description,
      genre,
      period,
      pushlished_home,
      author_id,
    } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      throw CustomErrorHandler.NotFound("book not found");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        pages,
        pushlished_year,
        img_url,
        description,
        genre,
        period,
        pushlished_home,
        author_id,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Kitob muvaffaqiyatli yangilandi",
      book: updatedBook,
    });
  } catch (error) {
    next(error);
    res.status(400).json({ error: error.message });
  }
};

// Kitobni o‘chirish
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("book not found");
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Kitob muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};
