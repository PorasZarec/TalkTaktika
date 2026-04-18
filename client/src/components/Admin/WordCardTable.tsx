import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCards, useDeleteCard, type WordCard } from "@/hooks/useWordCards";
import { WordCardDialog } from "./WordCardDialog";

export function WordCardTable() {
  const { data: cards, isLoading, isError } = useCards();
  const deleteMutation = useDeleteCard();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<WordCard | null>(null);

  if (isLoading) return <div className="p-4 text-center">Loading cards...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error loading cards from the server.
      </div>
    );

  const handleEdit = (card: WordCard) => {
    setEditingCard(card);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCard(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Word Cards</h2>
        <Button onClick={handleCreate}>Add New Card</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!cards || cards.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  No word cards found.
                </TableCell>
              </TableRow>
            )}
            {cards?.map((card) => (
              <TableRow key={card._id}>
                <TableCell className="font-medium">{card.word}</TableCell>
                <TableCell>{card.category}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.isActive ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"}`}
                  >
                    {card.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(card)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(card._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <WordCardDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        cardToEdit={editingCard}
      />
    </div>
  );
}
