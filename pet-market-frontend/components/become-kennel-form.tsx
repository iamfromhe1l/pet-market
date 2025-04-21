'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { BecomeKennelSchema } from '@/zod/become-kennel-schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

export const BecomeKennelForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof BecomeKennelSchema>>({
    resolver: zodResolver(BecomeKennelSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof BecomeKennelSchema>) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="grid gap-6 md:flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название питомника</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      id="name"
                      type="text"
                      placeholder="Кошачий домик"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание питомника</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      id="description"
                      placeholder="Введите описание питомника"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      id="address"
                      placeholder="Введите адрес питомника"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Продолжить
          <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};
