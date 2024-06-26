import { check } from "express-validator";

const addressesValidations = [
    check("address").notEmpty(),
    check("complement").notEmpty(),
    check("observation").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("city").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("state").notEmpty().matches("^[a-zA-Z0-9 ]*$"),
    check("country").notEmpty().matches("^[a-zA-Z0-9 ]*$")
];

export default addressesValidation;