'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';
import { UserProvider } from '@/context/user/user-context';
import { AuthProvider } from '@/context/auth/auth-context';
import { Toaster } from './ui/sonner';
import { KennelProvider } from '@/context/kennel/kennel-context';
import { CategoryProvider } from '@/context/category/category-context';
import { PetProvider } from '@/context/pet/pet-context';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PetProvider>
      <CategoryProvider>
        <KennelProvider>
          <UserProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </UserProvider>
        </KennelProvider>
      </CategoryProvider>
    </PetProvider>
  );
};
