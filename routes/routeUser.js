import "dotenv/config";
import express, { Router } from "express";
import userController from "../controllers/userController";
import validationUser from "../middlewares/validationUser";
import { expressjwt } from "express-jwt";

const router = express.Router();

router.get("/", userController.list);
router.get("/:id", userController.findUserById);
router.post("/", validationUser, userController.createNewUser);
router.post("/login", userController.login);
router.post("/userProfile", expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET}), userController.userProfile);
router.patch(":id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;