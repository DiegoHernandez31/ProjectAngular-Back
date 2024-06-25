import Sell from "../models/sellModel.js";
import Items from "../models/itemsModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const salesList = await Sell.find();
        res.json(salesList)
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function findSaleById(req, res) {
    try {
        const saleId = req.params.id;
        const sale = await Sell.findById(saleId).populate("items").populate("user").populate("paymentMethod");
        if(!sale) {
            errorHandler.error404NotFound(res, Sell.modelName);
        }
        res.status(200).json(sale);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function createNewSale(req, res) {
    try {
        const newSale = await Sell.create({
            total: req.body.total,
            subtotal: req.body.subtotal,
            taxes: req.body.taxes,
            observation: req.body.observation,
            date: req.body.date,
            dueDate: req.body.dueDate,
            user: req.body.user,
            paymentMethod: req.body.paymentMethod,
        });
        if(req.body.items && req.body.items.length > 0) {
            for(const item of req.body.items) {
                await Items.create({
                    quantity: item.quantity,
                    discount: item.discount,
                    tax: item.tax,
                    totalItem: item.totalItem,
                    perfume: item._id,
                    sell: newSale._id,
                });
            }
        }
        res.status(200).json(newSale);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function updateSale(req, res) {
    try {
        const sale = await Sell.findById(req.params.id);

        sale.total = req.body.total || sale.total;
        sale.subtotal = req.body.subtotal || sale.subtotal;
        sale.taxes = req.body.taxes || sale.taxes;
        sale.observation = req.body.observation || sale.observation;
        sale.date = req.body.date || sale.date;
        sale.dueDate = req.body.dueDate || sale.dueDate;
        sale.user = req.body.user || sale.user;
        sale.paymentMethod = req.body.paymentMethod || sale.paymentMethod;

        

        await sale.save();
        res.status(200).json(sale);
    } catch(err) {
            errorHandler.error500ServerError(res, err);
    }
}

async function deleteSale(req, res) {
    try {
        const sale = await Sell.findById(req.params.id);
        if(!sale) {
            errorHandler.error404NotFound(res, Sell.modelName);
        }
        await Sell.deleteOne(sale);
        res.status(200).json("Sale deleted successfully");
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findSaleById,
    createNewSale,
    updateSale,
    deleteSale
};