import CategoryApi from '@/api/category/category-api';
import { CreateCustomCategoryParams } from '@/api/category/types';
import { CategoryModel } from '@/api/models/category-model';
import { BaseResponse } from '@/api/types';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface CategoryState {
  categories: CategoryModel[];
}

interface CategoryProps {
  categoryState?: CategoryState;
  loading?: boolean;
  onGetKennelCategories?: (
    kennelId: string,
  ) => Promise<BaseResponse<CategoryModel[]>>;
  onCreateCustomCategory?: (
    params: CreateCustomCategoryParams,
  ) => Promise<BaseResponse<CategoryModel>>;
  onUpdateCustomCategory?: (
    categoryId: string,
    params: CreateCustomCategoryParams,
  ) => Promise<BaseResponse<CategoryModel>>;
  onSetCategoryState?: (categories: CategoryModel[]) => void;
  onRemoveCategory?: (
    categoryId: string,
    isSystem: boolean,
  ) => Promise<BaseResponse<void>>;
  onGetSystemCategories?: () => Promise<BaseResponse<CategoryModel[]>>;
  onRestoreCategory?: (category: CategoryModel) => Promise<BaseResponse<void>>;
}

const CategoryContext = createContext<CategoryProps>({});

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [categoryState, setCategoryState] = useState<CategoryState>({
    categories: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getSystemCategories = async (): Promise<
    BaseResponse<CategoryModel[]>
  > => {
    try {
      const data = await CategoryApi.getSystemCategories();

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<CategoryModel[]>(e);
    }
  };

  const getKennelCategories = async (
    kennelId: string,
  ): Promise<BaseResponse<CategoryModel[]>> => {
    setLoading(true);

    try {
      const data = await CategoryApi.getCategoriesByKennel(kennelId);

      setCategoryState({
        categories: data.categoryIds,
      });

      setLoading(false);

      return {
        data: data.categoryIds,
      };
    } catch (e: unknown) {
      return getAxiosError<CategoryModel[]>(e);
    }
  };

  const createCustomCategory = async (
    params: CreateCustomCategoryParams,
  ): Promise<BaseResponse<CategoryModel>> => {
    try {
      const data = await CategoryApi.createCustomCategory(params);

      setCategoryState({
        categories: [...categoryState.categories, data],
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<CategoryModel>(e);
    }
  };

  const updateCustomCategory = async (
    categoryId: string,
    params: CreateCustomCategoryParams,
  ): Promise<BaseResponse<CategoryModel>> => {
    try {
      const data = await CategoryApi.updateCustomCategory(categoryId, params);

      setCategoryState({
        categories: categoryState.categories.map((category) =>
          category._id !== categoryId ? category : data,
        ),
      });

      return {
        data,
      };
    } catch (e: unknown) {
      return getAxiosError<CategoryModel>(e);
    }
  };

  const removeCategory = async (
    categoryId: string,
    isSystem: boolean,
  ): Promise<BaseResponse<void>> => {
    try {
      await CategoryApi.removeCategory(categoryId);

      setCategoryState({
        categories: isSystem
          ? categoryState.categories.filter(
            (category) => category._id !== categoryId,
          )
          : categoryState.categories.map((category) =>
            category._id === categoryId
              ? {
                ...category,
                isDisabled: true,
              }
              : category,
          ),
      });

      return {
        data: null,
      };
    } catch (e: unknown) {
      return getAxiosError(e);
    }
  };

  const restoreCategory = async (
    category: CategoryModel,
  ): Promise<BaseResponse<void>> => {
    try {
      await CategoryApi.restoreCategory(category._id);

      setCategoryState({
        categories: category.isSystem
          ? [...categoryState.categories, category]
          : categoryState.categories.map((curCategory) =>
            curCategory._id === category._id
              ? { ...curCategory, isDisabled: false }
              : curCategory,
          ),
      });

      return {
        data: null,
      };
    } catch (e) {
      return getAxiosError(e);
    }
  };

  const value: CategoryProps = {
    categoryState,
    loading,
    onGetKennelCategories: getKennelCategories,
    onCreateCustomCategory: createCustomCategory,
    onUpdateCustomCategory: updateCustomCategory,
    onSetCategoryState: (categories: CategoryModel[]) =>
      setCategoryState({
        categories,
      }),
    onRemoveCategory: removeCategory,
    onGetSystemCategories: getSystemCategories,
    onRestoreCategory: restoreCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
