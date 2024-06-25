import Images from "../models/imagesModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
  try {
    const imagesList = await Images.find();
    res.json(imagesList);
  } catch (err) {
    errorHandler.error500ServerError(res, err);
  }
}

async function findImageById(req, res) {
  try {
        const imageId = req.params.id;
        const image = await Images.findById(imageId);
        if(!image) {
            errorHandler.error404NotFound(res, Images.modelName);
        }
        res.status(200).json(image);
    } catch (err) {
    errorHandler.error500ServerError(res, err);
    }
}

async function uploadNewImage(req, res) {
    if(!req.file) {
        const err = "The field file is required"
        errorHandler.error400BadRequest(res, err);
    }
    try {
        const newImage = await Images.create({
            description: req.body.description,
            imgUrl: `../public/uploads/${req.file.filename}`,
        });
        res.json(newImage);
    } catch (err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function updateImage(req, res) {
  try {
    const image = await Images.findById(req.params.id);

    image.description = req.body.description || image.description;
    image.imgUrl = `../public/uploads/${req.file.filename}` || image.imgUrl;

    await image.save();

    res.json(image);
  } catch (err) {
    errorHandler.error500ServerError(res, err);
  }
}

async function deleteImage(req, res) {
    try {
        await Images.findByIdAndDelete(req.params.id);
        res.status(200).json("Image deleted successfully");
    } catch (err) {
        errorHandler.error500ServerError(res, err);  
    }
}


export default {
  list,
  findImageById,
  uploadNewImage,
  updateImage,
  deleteImage
};