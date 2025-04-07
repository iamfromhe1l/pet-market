import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
