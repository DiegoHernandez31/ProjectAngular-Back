import { check } from "express-validator";

const personValidations = [
    check("name").notEmpty().matches("^[a-zA-Z0-9 ]*$-"),
    check("lastname").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("document").notEmpty().isNumeric(),
    check("cellphone").notEmpty().isNumeric(),
];

export default personValidation;