// ...

import * as Yup from 'yup';

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registerSchema = Yup.object().shape({
  email: Yup.string().required('Không được để trống email'),
  password: Yup.string()
    .required('Không được để trống mật khẩu')
    .min(4, 'Mật khẩu phải ít nhất 4 kí tự')
    .max(12, 'Mật khẩu không được vượt qúa 12 kí tự'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Mật khẩu không trùng khớp'
  ),
  phone_number: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
});

export const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  phone_number: ''
};

export interface IFormValue {
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
}
