import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { reviewCode } from "./services/ai.service.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/review-code", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Code snippet is required" });

    const review = await reviewCode(code);
    res.json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
