import { KennelStatusEnum } from '@/types/kennel-types';

export interface KennelModel {
  _id: string;
  name: string;
  description: string;
  address: string;
  status: KennelStatusEnum;
  adminMessage?: string;
}
