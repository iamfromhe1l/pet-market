import { api } from '../consts';
import { CategoryModel, KennelCategoriesModel } from '../models/category-model';
import { CreateCustomCategoryParams } from './types';

export default class CategoryApi {
  static async getSystemCategories(): Promise<CategoryModel[]> {
    return (await api.get('/categories/system')).data;
  }

  static async getCategoryById(
    kennelId: string,
    categoryId: string,
  ): Promise<CategoryModel[]> {
    return (await api.get(`/categories/${kennelId}/${categoryId}`)).data;
  }

  static async getCategoriesByKennel(
    kennelId: string,
  ): Promise<KennelCategoriesModel> {
    return (await api.get(`/categories/${kennelId}`)).data;
  }

  static async createCustomCategory(
    params: CreateCustomCategoryParams,
  ): Promise<CategoryModel> {
    return (await api.post('/categories', params)).data;
  }

  static async restoreCategory(categoryId: string): Promise<CategoryModel> {
    return (await api.patch(`/categories/restore/${categoryId}`)).data;
  }

  static async updateCustomCategory(
    categoryId: string,
    params: CreateCustomCategoryParams,
  ): Promise<CategoryModel> {
    return (await api.patch(`/categories/${categoryId}`, params)).data;
  }

  static async removeCategory(categoryId: string): Promise<void> {
    return (await api.delete(`/categories/${categoryId}`)).data;
  }
}
