// ...
import * as Yup from 'yup';
import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import dayjs from 'dayjs';

export const userScheduleSchema = Yup.object().shape({
  date: Yup.string().required('Không được để trống ngày'),
  quantity: Yup.number()
    .typeError('Hãy nhập số cho trường này')
    .min(1, 'Nhập ít nhất 1 người')
    .max(50, 'Chỉ được nhập tối đa 50'),
  reason: Yup.string().required('Không được để trống lý do khám')
});

export const scheduleSchema = userScheduleSchema.shape({
  phone: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  name: Yup.string().required('Không được để trống tên')
});

export const scheduleEditSchema = scheduleSchema.shape({
  total_money: Yup.number().typeError('Hãy nhập số cho trường này')
});

export const defaultValues = {
  date: dayjs(new Date()).format(),
  quantity: '',
  reason: ''
};

export const scheduledefaultValues = {
  ...defaultValues,
  status: 'chưa khám',
  total_money: '0',
  branch: '',
  room: '',
  is_user: false,
  booking_name: '',
  doctor: '',
  phone: ''
};

export interface IFormValue {
  date: string;
  quantity: string;
  reason: string;
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

export const statusOptions = [
  {
    id: 'chưa khám',
    name: 'Chưa Khám'
  },
  {
    id: 'đang khám',
    name: 'Đang Khám'
  },
  {
    id: 'đã khám',
    name: 'Đã Khám'
  }
];

export const statusTableOptions = [
  {
    id: 'tất cả',
    name: 'Tất Cả'
  },
  ...statusOptions
];
