import express from "express";
import creditCardController from "../controllers/creditCardController.js";
import creditCardValidation from "../middlewares/validationCreditCard.js"
import errorHandler from "../utils/errorHandler.js";

const router = express.Router();

router.get("/", creditCardController.list);
router.get("/:id", creditCardController.findCreditCardById);
router.post("/", creditCardValidation, errorHandler.errorsIsEmpty, creditCardController.createNewCreditCard);
router.patch("/:id", creditCardController.updateCreditCard);
router.delete("/:id", creditCardController.deleteCreditCard);

export default router;