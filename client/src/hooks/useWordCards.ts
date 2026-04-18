import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface WordCard {
  _id: string;
  word: string;
  category: 'Tao' | 'Lugar' | 'Bagay' | 'Aksyon' | 'Kalikasan' | 'Halo-halo';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

// Fetch all Cards
export function useCards() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: async (): Promise<WordCard[]> => {
      const res = await fetch(`${API_BASE_URL}/cards`);
      if (!res.ok) throw new Error('Failed to fetch cards');
      return res.json();
    },
  });
}

// Create Card
export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCard: Omit<WordCard, '_id' | 'createdAt' | 'updatedAt'>) => {
      const res = await fetch(`${API_BASE_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      if (!res.ok) throw new Error('Failed to create card');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
}

// Update Card
export function useUpdateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCard: WordCard) => {
      const { _id, ...rest } = updatedCard;
      const res = await fetch(`${API_BASE_URL}/cards/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      });
      if (!res.ok) throw new Error('Failed to update card');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
}

// Delete Card
export function useDeleteCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete card');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
}
