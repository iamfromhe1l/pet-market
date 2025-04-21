import axios from 'axios';
import { UserModel } from '../models/user-model';

export default class UserApi {
  static async getUser(): Promise<UserModel> {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/users`)).data;
  }
}
