'use client';

import { UserModel } from '@/api/models/user-model';
import { BaseResponse } from '@/api/types';
import UserApi from '@/api/user/user-api';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface UserState {
  user?: UserModel;
}

interface UserProps {
  userState?: UserState;
  onSetUser?: (user: UserModel) => void;
  onClearUser?: () => void;
  onGetUser?: () => Promise<BaseResponse<UserModel>>;
}

const UserContext = createContext<UserProps>({});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({});

  const setUser = (user: UserModel) => {
    setUserState({
      user,
    });
  };

  const clearUser = () => {
    setUserState({
      user: undefined,
    });
  };

  const getUser = async (): Promise<BaseResponse<UserModel>> => {
    try {
      const data = await UserApi.getUser();

      setUserState({
        user: data,
      });

      return {
        data,
      };
    } catch (e: unknown) {
      clearUser();
      return getAxiosError<UserModel>(e);
    }
  };

  const value: UserProps = {
    userState,
    onSetUser: setUser,
    onClearUser: clearUser,
    onGetUser: getUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
