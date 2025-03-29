import Groq from "groq-sdk";
import dotenv from "dotenv";
import Query from "../models/Query.js";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Handle chatbot responses and save queries
export const virtualAssistant = async (req, res) => {
    try {
        const { text } = req.body;

        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: text }],
            max_tokens: 100
        });

        const response = chatCompletion.choices[0].message.content;

        // Save query and response in MongoDB
        const newQuery = new Query({ text, response });
        await newQuery.save();

        res.json({ message: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Retrieve chat history for the sidebar
export const getChatHistory = async (req, res) => {
    try {
        const chatHistory = await Query.find().sort({ createdAt: -1 }).limit(10); // Fetch last 10 messages
        res.json(chatHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
