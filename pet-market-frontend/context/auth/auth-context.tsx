'use client';

import AuthApi from '@/api/auth/auth-api';
import { AuthResponse, LoginParams, RegisterParams } from '@/api/auth/types';
import { BaseResponse } from '@/api/types';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import axios from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUser } from '../user/user-context';
import { UserModel } from '@/api/models/user-model';
import { api } from '@/api/consts';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  authenticated: boolean;
}

interface AuthProps {
  authState?: AuthState;
  loading?: boolean;
  onRegister?: (params: RegisterParams) => Promise<BaseResponse<AuthResponse>>;
  onLogin?: (params: LoginParams) => Promise<BaseResponse<AuthResponse>>;
  onLogout?: () => Promise<BaseResponse>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { onSetUser, onGetUser, onClearUser } = useUser();

  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    refreshToken: null,
    authenticated: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const clearTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    axios.defaults.headers.common['Authorization'] = '';
    api.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const logout = async (): Promise<BaseResponse> => {
    try {
      await AuthApi.logout();

      clearTokens();
      onClearUser!();

      return {
        data: null,
      };
    } catch (e: unknown) {
      return getAxiosError(e);
    }
  };

  const refresh = async () => {
    try {
      const data = await AuthApi.refresh();

      const { access_token, refresh_token } = data.jwt;

      setAuthState({
        token: access_token,
        refreshToken: refresh_token,
        authenticated: true,
      });

      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      onSetUser!(data.user);
    } catch (e) {
      clearTokens();
      onClearUser!();

      return e;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const originalRequest = error.config;
          const alreadyRefreshed = originalRequest._alreadyRefreshed;

          if (error.response?.status === 401 && !alreadyRefreshed) {
            originalRequest._alreadyRefreshed = true;

            const refreshError = await refresh();

            if (refreshError) {
              return Promise.reject(refreshError);
            } else {
              return axios(originalRequest);
            }
          }
          return Promise.reject(error);
        },
      );

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;

      setAuthState({
        token,
        refreshToken,
        authenticated: true,
      });

      onGetUser!().then(() => {
        setLoading(false);
      });
    } else {
      onClearUser!();
      setLoading(false);
    }
  }, []);

  const register = async (
    params: RegisterParams,
  ): Promise<BaseResponse<AuthResponse>> => {
    try {
      const data = await AuthApi.register(params);

      const { access_token, refresh_token } = data.jwt;

      setAuthState({
        token: access_token,
        refreshToken: refresh_token,
        authenticated: true,
      });

      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      onSetUser!(data.user);

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<AuthResponse>(e);
    }
  };

  const login = async (
    params: LoginParams,
  ): Promise<BaseResponse<AuthResponse>> => {
    try {
      const data = await AuthApi.login(params);

      const { access_token, refresh_token } = data.jwt;

      setAuthState({
        token: access_token,
        refreshToken: refresh_token,
        authenticated: true,
      });

      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      onSetUser!(data.user);

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<AuthResponse>(e);
    }
  };

  const value: AuthProps = {
    authState,
    loading,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
