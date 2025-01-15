import express from "express";
import { LoginUser, registerUser } from "../controller/auth/auth.js";
import { getLeaderBoard } from "../controller/leaderboard/leaderBoard.js";
import { gemaiAi } from "../controller/gemani/gemni.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login",LoginUser);
router.get("/leader-board",getLeaderBoard)
router.post("/ask/qustions",gemaiAi)

export default router;
