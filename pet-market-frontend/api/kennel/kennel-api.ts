import { KennelModel } from '../models/kennel-model';
import { CreateKennelParams } from './types';
import { api } from '../consts';

export default class KennelApi {
  static async getPendingKennels(): Promise<KennelModel[]> {
    return (await api.get('/kennels/unapproved')).data;
  }

  static async getApprovedKennels(): Promise<KennelModel[]> {
    return (await api.get('/kennels/approved')).data;
  }

  static async getKennel(kennelId: string): Promise<KennelModel> {
    return (await api.get(`/kennels/${kennelId}`)).data;
  }

  static async createKennel(params: CreateKennelParams): Promise<KennelModel> {
    return (await api.post('/kennels', params)).data;
  }

  static async approveKennel(kennelId: string): Promise<KennelModel> {
    return (await api.patch(`/kennels/approve/${kennelId}`)).data;
  }

  static async approveKennel(kennelId: string): Promise<KennelModel> {
    return (
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL!}/kennels/approve/${kennelId}`,
      )
    ).data;
  }
}
