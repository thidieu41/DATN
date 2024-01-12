// ...

import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống họ và tên'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Không được để trống email'),
  phone: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  addr: Yup.string().required('Không được để trống địa chỉ'),
  DoB: Yup.string().required('Không được để trống ngày sinh')
});

export const defaultValues = {
  name: '',
  email: '',
  gender: 'male',
  DoB: '',
  phone: '',
  addr: ''
};

export interface IFormValue {
  name: string;
  email: string;
  gender: string;
  DoB: string;
  phone: string;
  addr: string;
}
