import express from "express";
import { virtualAssistant, getChatHistory } from "../controllers/assistantController.js";

const router = express.Router();

// Route to handle chatbot queries
router.post('/virtualAssistant', virtualAssistant);

// Route to fetch chat history
router.get('/chatHistory', getChatHistory);

export default router;
