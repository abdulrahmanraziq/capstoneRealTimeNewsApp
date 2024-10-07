import express from "express";
import newsController from "../controller/news.js";
import verify from "../middleware/verify.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/createNews", verify, verifyAdmin, newsController.createNews);
router.get("/getBreakingNews", verify, newsController.getBreakingNews);
router.get("/getTopic/:topic", verify, newsController.getTopic);
router.get("/getNewsById/:id", newsController.getNewsById);

export default router;
