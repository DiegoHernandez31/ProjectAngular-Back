import mongoose from "../config/mongoose.js";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    imgUrl: String,
});
const Category = mongoose.model("Category", categorySchema);

export default Category;