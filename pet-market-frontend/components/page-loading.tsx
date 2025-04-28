import { Loader2 } from 'lucide-react';

export const PageLoading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
