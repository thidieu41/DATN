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
  phone_number: Yup.string()
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
  phone_number: '',
  name: '',
  status: 'chưa khám',
  total_money: '0'
};

export interface IFormValue {
  date: string;
  quantity: string;
  reason: string;
}

export interface IFormValueScheduleProps extends IFormValue {
  name: string;
  phone_number: string;
  status: string;
  total_money: string;
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
  ...statusOptions,
  {
    id: 'tất cả',
    name: 'Tất Cả'
  }
];
