'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
import { CreateKennelParams } from '@/api/kennel/types';
import { useKennel } from '@/context/kennel/kennel-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const BecomeKennelForm = () => {
  const { onCreateKennel } = useKennel();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof BecomeKennelSchema>>({
    resolver: zodResolver(BecomeKennelSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
    },
  });

  const createKennel = async (
    params: CreateKennelParams,
    toastId: string | number,
  ) => {
    const res = await onCreateKennel!(params);

    if (res && res.error) {
      toast.error(res.error, {
        id: toastId,
      });
      form.control.setError('name', {});
      form.control.setError('description', {});
      form.control.setError('address', { message: res.error });
    } else {
      toast.success('Заявка на подтверждение питомника отправлена!', {
        id: toastId,
      });
      router.replace(`/kennel/${res.data?._id}`);
    }
  };

  const onSubmit = async (data: z.infer<typeof BecomeKennelSchema>) => {
    const id = toast.loading('Подождите...', {
      dismissible: false,
      duration: 6000,
    });
    setLoading(true);
    await createKennel(data, id);
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
            <div className="flex flex-col gap-4 xl:flex-row">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Описание питомника</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        id="description"
                        className="min-h-28"
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
                  <FormItem className="flex-1">
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        id="address"
                        className="min-h-28"
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
