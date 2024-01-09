import { phoneRegExp } from 'src/content/authen/register/registerSchema';
import * as Yup from 'yup';

export const branchSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên chi nhánh'),
  address: Yup.string().required('Không được để trống địa chỉ'),
  rooms: Yup.string().required('Không được để trống danh sách phòng'),
  phone: Yup.string()
    .required('Không được để trống số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
});

export const defaultValues = {
  name: '',
  address: '',
  rooms: '',
  phone: ''
};
