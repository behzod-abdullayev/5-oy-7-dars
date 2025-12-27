const express = require("express");
const { uploadImage, getImages } = require("../controller/image.controller");
const router = express.Router();



router.post("/upload", uploadImage);
router.get("/get_all_images", getImages);

module.exports = router;
