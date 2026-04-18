// server/src/models/WordCard.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IWordCard extends Document {
  word: string;
  category: 'Tao' | 'Lugar' | 'Bagay' | 'Aksyon' | 'Kalikasan' | 'Halo-halo';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WordCardSchema: Schema = new Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Tao', 'Lugar', 'Bagay', 'Aksyon', 'Kalikasan', 'Halo-halo'],
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWordCard>('WordCard', WordCardSchema);