import { api } from '../consts';
import { StatsData } from './types';

export default class PublicApi {
  static async getStats(): Promise<StatsData> {
    return (await api.get('/public/stats')).data;
  }
}
