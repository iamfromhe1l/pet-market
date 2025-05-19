export interface CategoryModel {
  _id: string;
  name: string;
  breeds: string[];
  ownerKennelId?: string;
  isSystem: boolean;
  isDisabled: boolean;
}

export interface KennelCategoriesModel {
  _id: string;
  kennelId: string;
  categoryIds: CategoryModel[];
}
