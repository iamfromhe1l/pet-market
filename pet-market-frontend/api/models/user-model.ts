import { UserRole } from '@/types/user-types';

export interface UserModel {
  _id: string;
  username?: string;
  email: string;
  role: UserRole;
  kennel: string;
}
