import Addresses from "../models/addressesModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const addressesList = await Addresses.find();
        res.json(addressesList);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function findAddressById(req, res) {
    try {
        const addressId = req.params.id;
        const address = await Addresses.findById(addressId);
        if(!address) {
            errorHandler.error404NotFound(res, Addresses.modelName);
        }
        res.status(200).json(address);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function createNewAddress(req, res) {
    try {
        const newAddress = await Addresses.create ({
            address: req.body.address,
            complement: req.body.complement,
            observation: req.body.observation,
            city: req.body.city,
            state: req.body.state,            
            country: req.body.country,
        });  
        res.status(200).json(newAddress);
    } catch(err) {
        if(err.code = 11000) {
            errorHandler.error400Database(res, err);
        } else {
            errorHandler.error500ServerError(res, err);
        }
    }
}

async function updateAddress(req, res) {
    try {
        const address = await Addresses.findById(req.params.id);

        address.address = req.body.address || address.address;
        address.complement = req.body.complement || address.complement;
        address.observation = req.body.observation || address.observation;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.country = req.body.country || address.country; 
        await address.save();   
        res.status(200).json(address);
    } catch(err) {
        if(err.code = 11000) {
            errorHandler.error400Database(res, err);
        } else {
        errorHandler.error500ServerError(res, err);
        }
    }
}

async function deleteAddress(req, res) {
    try {
        const address = await Addresses.findById(req.params.id);
        if(!address){
            errorHandler.error404NotFound(res, Addresses.modelName);
        }
        await Addresses.deleteOne(address);
        res.status(200).json("Address deleted successfully");
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findAddressById,
    createNewAddress,
    updateAddress,
    deleteAddress,
};