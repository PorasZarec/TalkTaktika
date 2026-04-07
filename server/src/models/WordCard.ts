import mongoose from "mongoose";

const wordCardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Chika", "Mga Lugar", "Pagkain", "Kasaysayan", "Mga Bagay", "Random"],
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export const WordCard = mongoose.model("WordCard", wordCardSchema);