export interface IProfileProps {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  is_male: boolean;
  addr: string;
  image: string;
  DoB: string;
  role: {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
  };
  updated_at: string;
}
