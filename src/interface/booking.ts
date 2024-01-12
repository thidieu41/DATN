export interface IItemProps {
  created_at: '2024-01-11T15:01:24.691080+07:00';
  id: 3;

  name: 'Name';
  price: 222;
  updated_at: '2024-01-11T15:01:24.691118+07:00';
  menu: {
    created_at: '2024-01-09T10:18:56.857967+07:00';
    id: 1;
    name: 'test';
    updated_at: '2024-01-09T10:18:56.858027+07:00';
  };
}

export interface IRoomProps {
  created_at: '2024-01-11T22:12:47.762677+07:00';
  id: 10;
  name: 'test';
  updated_at: '2024-01-11T22:12:47.762715+07:00';
  branch: {
    address: 'Da Nang';
    created_at: '2024-01-11T22:12:47.759971+07:00';
    doctor: 4;
    id: 11;
    name: 'Asus Gaming';
    phone: '0337825329';
    updated_at: '2024-01-11T22:12:47.760016+07:00';
  };
}
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
  booking_name: string;
  is_user: boolean;
  phone: string;
  room: IRoomProps;
  item: IItemProps;
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

export interface IFormValue {
  date: string;
  quantity: string;
  reason: string;
  category: string;
  item: string;
}

export interface IFormValueScheduleProps extends IFormValue {
  booking_name: string;
  phone: string;
  status: string;
  total_money: string;
  branch: string;
  room: string;
  is_user: boolean;
  doctor: string;
}
