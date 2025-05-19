'use client';

import { Check, ChevronRight, X } from 'lucide-react';
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
import { KennelModel } from '@/api/models/kennel-model';
import { BaseTooltip } from './base-tooltip';

interface BecomeKennelFormProps {
  kennel?: KennelModel;
  isEdit?: boolean;
  onCancel?: () => void;
  onSubmitForm?: (
    data: z.infer<typeof BecomeKennelSchema>,
    toasterId: number | string,
  ) => Promise<void>;
}

export const BecomeKennelForm: React.FC<BecomeKennelFormProps> = ({
  kennel,
  onCancel,
  onSubmitForm,
  isEdit = true,
}) => {
  const { onCreateKennel } = useKennel();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof BecomeKennelSchema>>({
    resolver: zodResolver(BecomeKennelSchema),
    defaultValues: {
      name: kennel?.name ?? '',
      description: kennel?.description ?? '',
      address: kennel?.address ?? '',
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
      form.control.setError('name', { message: res.error });
      form.control.setError('description', {});
      form.control.setError('address', {});
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
    if (onSubmitForm) {
      await onSubmitForm(data, id);
    } else {
      await createKennel(data, id);
    }
    setLoading(false);
  };

  const onCancelForm = () => {
    form.clearErrors();
    if (kennel) {
      form.setValue('name', kennel.name);
      form.setValue('address', kennel.address);
      form.setValue('description', kennel.description);
    }

    onCancel!();
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
                    {isEdit ? (
                      <Input
                        disabled={loading}
                        id="name"
                        type="text"
                        placeholder="Кошачий домик"
                        {...field}
                      />
                    ) : (
                      <p className="text-muted-foreground font-semibold">
                        {field.value}
                      </p>
                    )}
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
                      {isEdit ? (
                        <Textarea
                          disabled={loading}
                          id="description"
                          className="min-h-28"
                          placeholder="Введите описание питомника"
                          {...field}
                        />
                      ) : (
                        <p className="text-muted-foreground font-semibold">
                          {field.value}
                        </p>
                      )}
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
                      {isEdit ? (
                        <Textarea
                          disabled={loading}
                          id="address"
                          className="min-h-28"
                          placeholder="Введите адрес питомника"
                          {...field}
                        />
                      ) : (
                        <p className="text-muted-foreground font-semibold">
                          {field.value}
                        </p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {isEdit ? (
          onCancel ? (
            <div className="flex gap-4">
              <Button
                className="w-full flex-1 cursor-pointer"
                variant="secondary"
                disabled={loading}
                onClick={onCancelForm}
              >
                Отменить
                <X />
              </Button>
              <BaseTooltip text="После сохранения питомник снова будет должен пройти проверку администратора">
                <Button
                  type="submit"
                  className="w-full flex-1 cursor-pointer"
                  disabled={loading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Сохранить
                  <Check />
                </Button>
              </BaseTooltip>
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full flex-1 cursor-pointer"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Продолжить
              <ChevronRight />
            </Button>
          )
        ) : null}
      </form>
    </Form>
  );
};
