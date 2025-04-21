import { PawPrint } from 'lucide-react';
import Link from 'next/link';

export const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
        <PawPrint className="size-5" />
      </div>
      <p className="text-accent-foreground font-bold">PetMarket</p>
    </Link>
  );
};
