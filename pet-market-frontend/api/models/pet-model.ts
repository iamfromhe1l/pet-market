import { SexEnum } from '@/types/pet-types';
import { CategoryModel } from './category-model';
import { KennelModel } from './kennel-model';
import { Ref } from '@/types/model-types';

export interface PetModel {
  _id: string;
  title: string;
  birthDate?: Date;
  categoryId: Ref<CategoryModel>;
  sex: SexEnum;
  breed: string;
  price: number;
  kennel: Ref<KennelModel>;
  description: string;
  count: number;
  disabled: boolean;
}
