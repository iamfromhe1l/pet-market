import { SexEnum } from '@/types/pet-types';
import { PetModel } from '../models/pet-model';

export interface CreateUpdatePetParams {
  title: string;
  birthDate: Date;
  breed: string;
  categoryId: string;
  sex: SexEnum;
  price?: number;
  description: string;
  count?: number;
}

export interface SearchPetsParams {
  text?: string;
  sex?: SexEnum;
  priceMin?: number;
  priceMax?: number;
  kennelId?: string;
  categoryId?: string[];
  breed?: string[];
  page?: number;
  limit?: number;
  populateKennel?: boolean;
  sortBy?: 'price' | 'title';
  order?: 'asc' | 'desc';
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
}

export interface SearchPetsData extends PaginationInfo {
  items: PetModel[];
}
