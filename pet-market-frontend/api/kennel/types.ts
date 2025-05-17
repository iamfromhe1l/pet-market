import { KennelStatusEnum } from '@/types/kennel-types';

export interface CreateKennelParams {
  name: string;
  description: string;
  address: string;
}

export interface ReviewKennelParams {
  adminMessage: string;
  status: KennelStatusEnum;
}
