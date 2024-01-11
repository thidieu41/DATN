export interface IPostCategoriesProps {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IDetailsCategoriesProps extends IPostCategoriesProps {
  price?: string | number;
}
