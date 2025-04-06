'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useState } from 'react';

interface AuthFormProps {
  authType: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ authType }) => {
  const [isRegister] = useState<boolean>(authType === 'register');

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{isRegister ? 'Регистрация' : 'Вход'}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Заполните почту и пароль для {isRegister ? 'создания аккаунта' : 'входа в аккаунт'}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Почта</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          {isRegister ? 'Регистрация' : 'Вход'}
        </Button>
      </div>
      <div className="text-center text-sm">
        {isRegister ? 'Уже есть аккаунт? ' : 'Пока нет аккаунта? '}
        <Link href={isRegister ? '/login' : '/register'} className="underline underline-offset-4">
          {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </Link>
      </div>
    </form>
  );
};
