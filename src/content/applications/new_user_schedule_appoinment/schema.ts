// ...

import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  date: Yup.string().required('Không được để trống ngày'),
  number: Yup.string().required('Không được để trống số người'),
  reason: Yup.string().required('Không được để trống lý do khám')
});

export const defaultValues = {
  date: '',
  number: '',
  reason: ''
};

export interface IFormValue {
  date: string;
  number: string;
  reason: string;
}
