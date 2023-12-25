export interface IPostProps {
  category: number;
  content: string;
  created_at: string;
  id: number;
  image: string;
  title: string;
  updated_at: string;
}

export interface ICategoryProps {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}
