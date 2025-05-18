import React, { PropsWithChildren, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogHeader,
} from './ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { BreedSchema } from '@/zod/category-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';

export interface CreateBreedDialogProps extends PropsWithChildren {
  onSubmit: (breed: string) => void;
}

export const CreateBreedDialog: React.FC<CreateBreedDialogProps> = ({
  children,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof BreedSchema>>({
    resolver: zodResolver(BreedSchema),
    defaultValues: {
      breed: '',
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление новой породы</DialogTitle>
          <DialogDescription>Заполните название породы</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Описание питомника</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ввдеите название породы"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <DialogFooter>
            <Button
              className="flex-1"
              onClick={form.handleSubmit(({ breed }) => {
                onSubmit(breed);
                setIsOpen(false);
              })}
            >
              Добавить <Plus />
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
