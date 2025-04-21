import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';
import { UserProvider } from '@/context/user/user-context';
import { AuthProvider } from '@/context/auth/auth-context';
import { Toaster } from './ui/sonner';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  );
};
