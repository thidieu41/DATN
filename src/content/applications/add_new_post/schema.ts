// ...

import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên'),
  date: Yup.string().required('Không được để trống ngày'),
  number: Yup.string().required('Không được để trống số người'),
  phone_number: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  reason: Yup.string().required('Không được để trống lý do khám')
});

export const defaultValues = {
  name: '',
  type: '',
  content: '',
  title: ''
};

export interface IFormValue {
  name: string;
  type: string;
  content: string;
  title: string;
}
