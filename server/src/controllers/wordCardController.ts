// server/src/controllers/wordCardController.ts
import type { Request, Response } from 'express';
import WordCard from '../models/WordCard.js';

export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCard = new WordCard(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating WordCard', error });
  }
};

export const getAllCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, isActive } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (category) {
      filter.category = category;
    }
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const cards = await WordCard.find(filter);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching WordCards', error });
  }
};

export const getCardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await WordCard.findById(req.params.id);
    if (!card) {
      res.status(404).json({ message: 'WordCard not found' });
      return;
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching WordCard', error });
  }
};

export const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCard = await WordCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCard) {
      res.status(404).json({ message: 'WordCard not found' });
      return;
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating WordCard', error });
  }
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCard = await WordCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      res.status(404).json({ message: 'WordCard not found' });
      return;
    }
    res.status(200).json({ message: 'WordCard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting WordCard', error });
  }
};
