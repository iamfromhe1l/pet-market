import { UserModel } from '../models/user-model';
import { api } from '../consts';

export default class UserApi {
  static async getUser(): Promise<UserModel> {
    return (await api.get('/users')).data;
  }
}
