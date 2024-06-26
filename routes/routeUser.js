import "dotenv/config";
import express from "express";
import userController from "../controllers/userController.js";
import validationUser from "../middlewares/validationUser.js";
import errorHandler from "../utils/errorHandler.js";
import { expressjwt } from "express-jwt";

const router = express.Router();

router.get("/", userController.list);
router.get("/:id", userController.findUserById);
router.post("/", validationUser, errorHandler.errorsIsEmpty ,userController.createNewUser);
router.post("/login", userController.login);
router.post("/userProfile", expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET}), userController.userProfile);
router.patch(":id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;