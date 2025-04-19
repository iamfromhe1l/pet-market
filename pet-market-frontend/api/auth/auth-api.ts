import axios from 'axios';
import { RegisterParams, LoginParams, AuthResponse } from './types';

export default class AuthApi {
  static async register(params: RegisterParams): Promise<AuthResponse> {
    return (await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/auth/signup`, params)).data;
  }

  static async login(params: LoginParams): Promise<AuthResponse> {
    return (await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/auth/signin`, params)).data;
  }

  static async logout(): Promise<void> {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/auth/logout`);
  }
}
