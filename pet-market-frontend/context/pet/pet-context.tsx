import { PetModel } from '@/api/models/pet-model';
import PetApi from '@/api/pet/pet-api';
import {
  CreateUpdatePetParams,
  SearchPetsData,
  SearchPetsParams,
} from '@/api/pet/types';
import { BaseResponse } from '@/api/types';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface PetState {
  pets: PetModel[];
}

interface PetProps {
  petState?: PetState;
  onCreatePet?: (
    params: CreateUpdatePetParams,
  ) => Promise<BaseResponse<PetModel>>;
  onGetPetsByKennel?: () => Promise<BaseResponse<PetModel[]>>;
  onGetPetById?: (petId: string) => Promise<BaseResponse<PetModel>>;
  onUpdatePet?: (
    petId: string,
    params: Partial<CreateUpdatePetParams>,
  ) => Promise<BaseResponse<PetModel>>;
  onDeletePet?: (petId: string) => Promise<BaseResponse<void>>;
  onSearchPets?: (
    params: SearchPetsParams,
  ) => Promise<BaseResponse<SearchPetsData>>;
}

const PetContext = createContext<PetProps>({});

export const usePet = () => useContext(PetContext);

export const PetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [petState, setPetState] = useState<PetState>({
    pets: [],
  });

  const createPet = async (
    params: CreateUpdatePetParams,
  ): Promise<BaseResponse<PetModel>> => {
    try {
      const data = await PetApi.createPet(params);

      setPetState({
        pets: [...petState.pets, data],
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<PetModel>(e);
    }
  };

  const updatePet = async (
    petId: string,
    params: Partial<CreateUpdatePetParams>,
  ): Promise<BaseResponse<PetModel>> => {
    try {
      const data = await PetApi.updatePet(petId, params);

      setPetState({
        pets: petState.pets.map((pet) => (pet._id === data._id ? data : pet)),
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<PetModel>(e);
    }
  };

  const getPetsByKennel = async (): Promise<BaseResponse<PetModel[]>> => {
    try {
      const data = await PetApi.getPetsByKennel();

      setPetState({
        pets: data,
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<PetModel[]>(e);
    }
  };

  const getPetById = async (petId: string): Promise<BaseResponse<PetModel>> => {
    try {
      const data = await PetApi.getPetById(petId);

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<PetModel>(e);
    }
  };

  const searchPets = async (
    params: SearchPetsParams,
  ): Promise<BaseResponse<SearchPetsData>> => {
    try {
      const data = await PetApi.searchPets(params);

      setPetState({
        pets: data.items,
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<SearchPetsData>(e);
    }
  };

  const deletePet = async (petId: string): Promise<BaseResponse<void>> => {
    try {
      await PetApi.deletePet(petId);

      setPetState({
        pets: petState.pets.map((pet) =>
          pet._id === petId ? { ...pet, disabled: true } : pet,
        ),
      });

      return {
        data: null,
      };
    } catch (e: unknown) {
      return getAxiosError(e);
    }
  };

  const value: PetProps = {
    petState,
    onCreatePet: createPet,
    onDeletePet: deletePet,
    onGetPetById: getPetById,
    onGetPetsByKennel: getPetsByKennel,
    onSearchPets: searchPets,
    onUpdatePet: updatePet,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};
