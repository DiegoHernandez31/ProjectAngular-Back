import Roll from "../models/rollModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const rollList = await Roll.find();
        res.json(rollList);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function findRollById(req, res) {
    try {
        const rollId = req.params.id;
        const roll = await Roll.findById(rollId);
        if(!roll) {
            errorHandler.error404NotFound(res, Roll.modelName);
        }
        res.status(200).json(roll);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function createNewRoll(req, res) {
    try {
        const newRoll = await Roll.create({
            name: req.body.name,
            description: req.body.description,
        });
        res.status(200).json(newRoll);
    } catch(err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        } else {
            errorHandler.error500ServerError(res, err);
        }
    }
}

async function updateRoll(req, res) {
    try {
        const roll = await Roll.findById(req.params.id);

        roll.name = req.body.name || roll.name;
        roll.description = req.body.description || roll.description;
        await roll.save();
        res.status(200).json(roll);
    } catch(err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        } else {
            errorHandler.error500ServerError(res, err);
        }
    }
}

async function deleteRoll(req, res) {
    try {
        const roll = await Roll.findById(req.params.id);
        if(!roll) {
            errorHandler.error404NotFound(res, Roll.modelName);
        }
        await Roll.deleteOne(roll);
        res.status(200).json("Roll deleted successfully");
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findRollById,
    createNewRoll,
    updateRoll,
    deleteRoll
};