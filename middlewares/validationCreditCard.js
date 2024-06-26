import { check } from "express-validator";

const creditCardValidations = [
    check("name").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("lastname").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("cardNumber").notEmpty().isNumeric(),
    check("goodThru").notEmpty(),
    check("cvv").notEmpty().isNumeric(),
    check("type").notEmpty()
];

export default creditCardValidation;