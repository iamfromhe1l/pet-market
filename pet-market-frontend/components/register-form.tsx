'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/zod/auth-schema';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => { }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Заполните почту и пароль для создания аккаунта
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input id="username" type="text" placeholder="Крутой котяра" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Регистрация
          </Button>
        </div>
        <div className="text-center text-sm">
          Уже есть аккаунт?
          <Link href='/login' className="ml-1 underline underline-offset-4">
            Войти
          </Link>
        </div>
      </form>
    </Form>
  );
};
