import express from "express";
import perfumeController from "../controllers/perfumeController.js";

const router = express.Router();

router.get("/", perfumeController.list);
router.get("/:id", perfumeController.findPerfumeById);
router.post("/", perfumeController.createNewPerfume);
router.patch("/:id", perfumeController.updatePerfume);
router.delete("/:id", perfumeController.deletePerfume);

export default router;