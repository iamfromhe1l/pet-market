'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/zod/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => { }


  return (
    <Form {...form}>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Вход</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Заполните почту и пароль для входа в аккаунт
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
            Вход
          </Button>
        </div>
        <div className="text-center text-sm">
          Пока нет аккаунта?
          <Link href='/register' className="ml-1 underline underline-offset-4">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Form>
  );
};
