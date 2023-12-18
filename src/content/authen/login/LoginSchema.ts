// ...

import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Không được để trống email'),
  password: Yup.string()
    .required('Không được để trống mật khẩu')
    .min(4, 'Mật khẩu phải ít nhất 4 kí tự')
    .max(12, 'Mật khẩu không được vượt qúa 12 kí tự')
});

export const defaultValues = {
  email: '',
  password: ''
};

export interface IFormValue {
  email: string;
  password: string;
}
