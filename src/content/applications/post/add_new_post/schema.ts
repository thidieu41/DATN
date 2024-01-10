// ...

import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  title: Yup.string().required('Không được để trống tiêu đề'),
  content: Yup.string().required('Không được để trống nội dung')
});

export const defaultValues = {
  category: '',
  content: '',
  title: ''
};

export interface IFormValue {
  category: string;
  content: string;
  title: string;
}
