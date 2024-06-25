import mongoose from "../config/mongoose.js";

const imagesSchema = mongoose.Schema({
    description: String,
    imgUrl: String,
});
const Images = mongoose.model("Images", imagesSchema);

export default Images;