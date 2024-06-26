import { check } from "express-validator";

const sellValidations = [
    check("observation").matches("^[a-zA-Z0-9 ]*$"),
];

export default sellValidation;