import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const doctorSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên'),
  degree_infor: Yup.string().required('Không được để trống bằng cấp'),
  phone: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Không được để trống email'),
  DoB: Yup.string().required('Không được để trống ngày sinh'),
  position: Yup.string().required('Không được để trống chức vụ')
});

export const defaultValues = {
  name: '',
  phone: '',
  email: '',
  position: '',
  DoB: null,
  degree_infor: ''
};
