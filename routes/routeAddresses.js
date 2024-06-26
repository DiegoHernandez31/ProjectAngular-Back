import express from "express";
import addressesController from "../controllers/addressesController.js";
import errorHandler from "../utils/errorHandler.js";
import addressesValidation from "../middlewares/validationAddresses.js";

const router = express.Router();

router.get("/", addressesController.list);
router.get("/:id", addressesController.findAddressById);
router.post("/", addressesValidation, errorHandler.errorsIsEmpty, addressesController.createNewAddress);
router.patch("/:id", addressesController.updateAddress);
router.delete("/:id", addressesController.deleteAddress);

export default router;