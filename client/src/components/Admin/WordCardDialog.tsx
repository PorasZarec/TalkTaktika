import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCard, useUpdateCard, type WordCard } from "@/hooks/useWordCards";

const categories = [
  "Tao",
  "Lugar",
  "Bagay",
  "Aksyon",
  "Kalikasan",
  "Halo-halo",
] as const;

const formSchema = z.object({
  word: z.string().min(1, "Word is required").trim(),
  category: z.enum(categories),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function WordCardDialog({
  isOpen,
  onClose,
  cardToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  cardToEdit: WordCard | null;
}) {
  const createMutation = useCreateCard();
  const updateMutation = useUpdateCard();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      category: "Tao",
      isActive: true,
    },
  });

  useEffect(() => {
    if (cardToEdit) {
      form.reset({
        word: cardToEdit.word,
        category: cardToEdit.category,
        isActive: cardToEdit.isActive,
      });
    } else {
      form.reset({
        word: "",
        category: "Tao",
        isActive: true,
      });
    }
  }, [cardToEdit, form, isOpen]);

  const onSubmit = (values: FormValues) => {
    if (cardToEdit) {
      updateMutation.mutate(
        { ...cardToEdit, ...values },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {cardToEdit ? "Edit Word Card" : "Add Word Card"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Word</label>
            <Input placeholder="Enter word" {...form.register("word")} />
            {form.formState.errors.word && (
              <p className="text-sm text-red-500">
                {form.formState.errors.word.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              {...form.register("category")}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {form.formState.errors.category && (
              <p className="text-sm text-red-500">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-4">
            <input
              type="checkbox"
              id="isActive"
              className="h-4 w-4"
              {...form.register("isActive")}
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active Status
            </label>
          </div>

          <Button type="submit" className="w-full">
            {cardToEdit ? "Save Changes" : "Add Card"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
