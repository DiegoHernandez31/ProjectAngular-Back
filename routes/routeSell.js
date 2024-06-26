import "dotenv/config";
import express from "express";
import sellController from "../controllers/sellController.js";
import errorHandler from "../utils/errorHandler.js";
import sellValidation from "../middlewares/validationSell.js";

const router = express.Router();

router.get("/", sellController.list);
router.get("/:id", sellController.findSaleById);
router.post("/", sellValidation, errorHandler.errorsIsEmpty, sellController.createNewSale);
router.patch("/:id", sellController.updateSale);
router.delete("/:id", sellController.deleteSale);

export default router;