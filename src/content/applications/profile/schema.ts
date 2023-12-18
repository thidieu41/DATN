// ...

import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống họ và tên'),
  email: Yup.string().required('Không được để trống email'),
  phone_number: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: Yup.string().required('Không được để trống địa chỉ')
});

export const defaultValues = {
  name: '',
  email: '',
  gender: 'male',
  dateofbirth: '',
  phone_number: '',
  address: ''
};

export interface IFormValue {
  name: string;
  email: string;
  gender: string;
  dateofbirth: string;
  phone_number: string;
  address: string;
}
