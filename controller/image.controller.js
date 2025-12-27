const Image = require("../schema/image.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const PORT = process.env.PORT || 4001;

 const uploadImage = async (req, res, next) => {
    try {
        const { filename, title } = req.body;

        if (!filename) {
            throw CustomErrorHandler.NotFound("url not found")
        }

const url = `http://localhost:${PORT}/images/${filename}`;

        const newImage = new Image({ url, title });
        await newImage.save();

        res.status(201).json({ message: "succes", image: newImage });
    } catch (error) {
        next(error)
    }
};

  const getImages = async (req, res, next) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
      next(error)
    }
};

module.exports = {
    uploadImage,
    getImages
}