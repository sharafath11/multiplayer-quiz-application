import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import UserRoutes from "../server/routes/userRoutes.js"
import QzRoute from "../server/routes/quizRoutes.js"
import cors from "cors"
import bodyParser from "body-parser";
dotenv.config();
connectDB();

const app = express();
const PORT=process.env.PORT || 4000
app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user",UserRoutes)
app.use("/Qz",QzRoute)

app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));