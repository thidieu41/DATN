import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const doctorSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên'),
  degree: Yup.string().required('Không được để trống bằng cấp'),
  phone: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Không được để trống email'),
  date: Yup.string().required('Không được để trống ngày sinh'),
  position: Yup.string().required('Không được để trống chức vụ')
});

export const defaultValues = {
  name: '',
  degree: '',
  date: '',
  phone: '',
  email: '',
  position: ''
};

export interface IFormValue {
  name: string;
  degree: string;
  date: string;
  phone: string;
  email: string;
  position: string;
}
