import { LogOut, ShieldUser, User } from 'lucide-react';
import { LogoLink } from './logo-link';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/user/user-context';
import { useAuth } from '@/context/auth/auth-context';
import { UserRole } from '@/types/user-types';

export const Header = () => {
  const { userState } = useUser();
  const { authState, onLogout } = useAuth();

  return (
    <header className="bg-background/30 sticky top-0 flex h-18 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-md">
      <div className="flex h-5 items-center space-x-5">
        <LogoLink />
        <Separator orientation="vertical" />
      </div>
      <div className="flex gap-4">
        {userState?.user?.role === UserRole.ADMIN ? (
          <Link href="/admin-dashboard">
            <Button className="cursor-pointer" size="lg">
              <ShieldUser />
              Админ-панель
            </Button>
          </Link>
        ) : null}
        {authState?.authenticated ? (
          <Button className="cursor-pointer" size="lg" onClick={onLogout}>
            <LogOut />
            Выйти
          </Button>
        ) : (
          <Link href="/login">
            <Button className="cursor-pointer" size="lg">
              <User />
              Войти
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
