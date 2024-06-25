import Category from "../models/categoryModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const categoryList = await Category.find();
        res.json(categoryList);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function findCategoryById(req, res) {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if(!category) {
            return errorHandler.error404NotFound(res, Category.modelName);
        }
        res.status(200).json(category);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function createNewCategory(req, res) {
    try {
        const newCategory = await Category.create ({
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl
        });
        res.status(200).json(newCategory);
    } catch(err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        }
         else {
            errorHandler.error500ServerError(res, err);
        }
    }
}

async function updateCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);

        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;
        category.imgUrl = req.body.imgUrl || category.imgUrl;
        await category.save();
        res.status(200).json(category);
    } catch(err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        }
        else {
            errorHandler.error500ServerError(res, err);
        }
    }   
}

async function deleteCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
            errorHandler.error404NotFound(res, Category.modelName);
        } 
        await Category.deleteOne(category);
        return res.status(200).json("Category deleted successfully");
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory,
};