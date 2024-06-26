import { check } from "express-validator";

const paymentMethodValidations = [
    check("name").notEmpty().isAlpha(),
    check("type").notEmpty().isAlpha()
];

export default paymentMethodValidation;