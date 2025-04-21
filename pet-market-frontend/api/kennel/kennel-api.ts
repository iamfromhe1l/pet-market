import axios from 'axios';
import { KennelModel } from '../models/kennel-model';
import { CreateKennelParams } from './types';

export default class KennelApi {
  static async getKennel(kennelId: string): Promise<KennelModel> {
    return (
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/kennels/${kennelId}`)
    ).data;
  }

  static async createKennel(params: CreateKennelParams): Promise<KennelModel> {
    return (
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/kennels`, params)
    ).data;
  }
}
