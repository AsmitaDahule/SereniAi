import Groq from "groq-sdk";
import dotenv from "dotenv";
import Query from "../models/Query.js"; // Import Query model to store responses

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(prompt) {
    const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", 
        messages: [{ role: "user", content: prompt }], 
        max_tokens: 100
    });

    const response = chatCompletion.choices[0].message.content;

    // Store query in MongoDB
    try {
        const newQuery = new Query({ text: prompt, response });
        await newQuery.save();
    } catch (error) {
        console.error("Error saving query:", error);
    }

    return response;
}

export default getResponse;
