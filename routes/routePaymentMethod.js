import express from "express";
import paymentMethodController from "../controllers/paymentMethodController.js";
import paymentMethodValidation from "../middlewares/validationPaymentMethod.js"
import errorHandler from "../utils/errorHandler.js";

const router = express.Router();

router.get("/", paymentMethodController.list);
router.get("/:id", paymentMethodController.findPaymentMethodById);
router.post("/", paymentMethodValidation, errorHandler.errorsIsEmpty, paymentMethodController.createNewPaymentMethod);
router.patch("/:id", paymentMethodController.updatePaymentMethod);
router.delete("/:id", paymentMethodController.deletePaymentMethod);

export default router;