'use client';

import KennelApi from '@/api/kennel/kennel-api';
import { CreateKennelParams } from '@/api/kennel/types';
import { KennelModel } from '@/api/models/kennel-model';
import { BaseResponse } from '@/api/types';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { useUser } from '../user/user-context';
import { UserRole } from '@/types/user-types';
import { UserModel } from '@/api/models/user-model';

interface KennelState {
  kennel?: KennelModel;
}

interface KennelProps {
  kennelState?: KennelState;
  loading?: boolean;
  onCreateKennel?: (
    params: CreateKennelParams,
  ) => Promise<BaseResponse<KennelModel>>;
  onGetKennel?: (kennelId: string) => Promise<BaseResponse<KennelModel>>;
}

const KennelContext = createContext<KennelProps>({});

export const useKennel = () => useContext(KennelContext);

export const KennelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { onSetUser, userState } = useUser();

  const [kennelState, setKennelState] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const createKennel = async (
    params: CreateKennelParams,
  ): Promise<BaseResponse<KennelModel>> => {
    try {
      const data = await KennelApi.createKennel(params);

      onSetUser!({
        ...(userState?.user as UserModel),
        role: UserRole.SELLER,
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<KennelModel>(e);
    }
  };

  const getKennel = async (
    kennelId: string,
  ): Promise<BaseResponse<KennelModel>> => {
    setLoading(true);
    try {
      const data = await KennelApi.getKennel(kennelId);

      setLoading(false);
      setKennelState({
        kennel: data,
      });

      return {
        data,
      };
    } catch (e) {
      return getAxiosError<KennelModel>(e);
    }
  };

  const value: KennelProps = {
    kennelState,
    loading,
    onCreateKennel: createKennel,
    onGetKennel: getKennel,
  };

  return (
    <KennelContext.Provider value={value}>{children}</KennelContext.Provider>
  );
};
