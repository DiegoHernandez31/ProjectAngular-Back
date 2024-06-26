import "dotenv/config";
import express from "express";
import personController from "../controllers/personController.js";
import personValidation from "../middlewares/validationPerson.js"
import errorHandler from "../utils/errorHandler.js";

const router = express.Router();

router.get("/", personController.list);
router.post("/", personValidation, errorHandler.errorsIsEmpty, personController.createNewPerson);
router.get("/:id", personController.findPersonById);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

export default router;