export interface IDoctor {
  id: string;
  name: string;
  date: Date | number;
  phone_number: string;
  role: string;
  degree: string;
}
export const DoctorList: IDoctor[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Minh',
    date: new Date().getTime(),
    phone_number: '056328473',
    role: 'Bác sĩ',
    degree: 'Bác sĩ chính'
  },
  {
    id: '1',
    name: 'Lê Thị Hạnh',
    date: new Date().getTime(),
    phone_number: '056328473',
    role: 'Bác sĩ',
    degree: 'Bác sĩ chính'
  },
  {
    id: '1',
    name: 'Nguyễn Thị Thanh An',
    date: new Date().getTime(),
    phone_number: '056328473',
    role: 'Bác sĩ',
    degree: 'Bác sĩ chính'
  },
  {
    id: '1',
    name: 'Trần Quốc Bảo',
    date: new Date().getTime(),
    phone_number: '056328473',
    role: 'Bác sĩ',
    degree: 'Bác sĩ chính'
  },
  {
    id: '1',
    name: 'Trần Ngọc Diệp',
    date: new Date().getTime(),
    phone_number: '056328473',
    role: 'Bác sĩ',
    degree: 'Bác sĩ chính'
  }
];
