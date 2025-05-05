import axios from 'axios';
import { RegisterParams, LoginParams, AuthResponse } from './types';
import { api } from '../consts';

export default class AuthApi {
  static async register(params: RegisterParams): Promise<AuthResponse> {
    return (await api.post('/auth/signup', params)).data;
  }

  static async login(params: LoginParams): Promise<AuthResponse> {
    return (await api.post('/auth/signin', params)).data;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  static async refresh(): Promise<AuthResponse> {
    return (
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/auth/refresh`)
    ).data;
  }
}
