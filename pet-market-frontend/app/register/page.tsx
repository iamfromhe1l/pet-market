import { PawPrint } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden overflow-hidden rounded-tr-xl rounded-br-xl lg:block">
        <Image
          src="/register-cat.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="auth-cat"
          quality={100}
          fill
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <PawPrint className="size-5" />
            </div>
            <p className="text-accent-foreground font-bold">PetMarket</p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <AuthForm authType="register" />
          </div>
        </div>
      </div>
    </div>
  );
}
