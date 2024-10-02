import { Router } from "express";
import { getData } from "../controllers/mock.controller.js";

const router = Router();

router.get("*", getData);
router.post("*", getData);
router.put("*", getData);
router.delete("*", getData);
router.patch("*", getData);

export default router;
