export interface IScheduleProps {
  created_at: string;
  date: string;
  doctor: string;
  id: string;
  quantity: string;
  reason: string;
  status: string;
  total_money: string;
  updated_at: string;
  booking_name: null;
  is_user: boolean;
  phone: null;
  room: null;
  user: {
    created_at: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    role: {
      created_at: string;
      id: number;
      name: number;
      updated_at: string;
    };
  };
}
