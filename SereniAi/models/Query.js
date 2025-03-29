import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    text: { type: String, required: true },
    response: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Optional user tracking
    createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model("Query", querySchema);
export default Query;
