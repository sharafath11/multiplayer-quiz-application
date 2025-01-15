import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const gemaiAi = async (req, res) => {
try {
  const genAI = new GoogleGenerativeAI(process.env.G_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = Object.keys(req.body)[0]; 


console.log(prompt)
const result = await model.generateContent(prompt);
res.status(200).json(result.response.text());
} catch (error) {
  res.json("Internal server error")
}
};