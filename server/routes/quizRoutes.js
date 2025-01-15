import express from "express";
import { randomQz, submitQuiz } from "../controller/quiz/randomQz.js";


const router = express.Router();
router.post("/randomQz",randomQz );
router.post("/submitQuiz",submitQuiz);



export default router;
