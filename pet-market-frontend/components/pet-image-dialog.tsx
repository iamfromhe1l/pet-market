import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from './ui/dialog';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

interface PetImageDialogProps extends PropsWithChildren {
  petImageSrc: string;
  petName: string;
}

export const PetImageDialog: React.FC<PetImageDialogProps> = ({
  petImageSrc,
  children,
  petName,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-screen md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>Фотография питомца &quot;{petName}&quot;</DialogTitle>
        </DialogHeader>
        <AspectRatio ratio={1} className="relative overflow-hidden rounded-xl">
          <Image
            src={petImageSrc}
            alt="pet-image"
            className="absolute inset-0 h-full w-full object-cover"
            fill
          />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};
