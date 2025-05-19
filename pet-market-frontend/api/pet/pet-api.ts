import { api } from '../consts';
import { PetModel } from '../models/pet-model';
import {
  CreateUpdatePetParams,
  SearchPetsParams,
  SearchPetsData,
} from './types';

export default class PetApi {
  static async createPet(params: CreateUpdatePetParams): Promise<PetModel> {
    return (await api.post('/pets/kennels', params)).data;
  }

  static async getPetsByKennel(): Promise<PetModel[]> {
    return (await api.get('/pets/kennels')).data;
  }

  static async getPetById(petId: string): Promise<PetModel> {
    return await api.get(`/pets/${petId}`);
  }

  static async updatePet(
    petId: string,
    params: Partial<CreateUpdatePetParams>,
  ): Promise<PetModel> {
    return (await api.patch(`/pets/${petId}`, params)).data;
  }

  static async deletePet(petId: string): Promise<void> {
    await api.delete(`/pets/${petId}`);
  }

  static async searchPets(params: SearchPetsParams): Promise<SearchPetsData> {
    return (await api.post('/pets/search', params)).data;
  }
}
