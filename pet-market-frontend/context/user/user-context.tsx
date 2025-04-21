'use client';

import { UserModel } from "@/api/models/user-model";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface UserState {
  user?: UserModel;
}

interface UserProps {
  userState?: UserState;
  onSetUser?: (user: UserModel) => void;
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

  const value: UserProps = {
    userState,
    onSetUser: setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
