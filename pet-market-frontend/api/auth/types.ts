import { UserModel } from '../models/user-model';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  username: string;
}

export interface JWTResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse {
  jwt: JWTResponse;
  user: UserModel;
}
