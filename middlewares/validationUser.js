import { check } from "express-validator";

const userValidation = [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty(),
];

export default userValidation;