// ...

import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên chi nhánh'),
  type: Yup.string().required('Không được để trống thể loại'),
  branch: Yup.string().required('Không được để trống chi nhánh')
});

export const defaultValues = {
  name: '',
  type: '',
  branch: ''
};

export interface IFormValue {
  name: string;
  type: string;
  branch: string;
}
