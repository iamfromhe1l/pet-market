import { KennelStatusEnum } from '@/types/kennel-types';
import { BadgeCheck, BadgeX, Ban, CircleDashed } from 'lucide-react';

export const KENNEL_STATUS = {
  [KennelStatusEnum.PENDING]: {
    title: 'Питомник ждет подтверждения администратором сайта',
    icon: <CircleDashed className="text-accent" size={22} />,
  },
  [KennelStatusEnum.APPROVED]: {
    title: 'Питомник подтвержден',
    icon: <BadgeCheck className="text-accent" size={22} />,
  },
  [KennelStatusEnum.DISABLED]: {
    title: 'Питомник заблокирован',
    icon: <Ban className="text-destructive" size={22} />,
  },
  [KennelStatusEnum.REJECTED]: {
    title: 'Питомник не прошел проверку',
    icon: <BadgeX className="text-destructive" size={22} />,
  },
} as const;
