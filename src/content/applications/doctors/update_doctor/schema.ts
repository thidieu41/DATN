// ...

import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên'),
  degree: Yup.string().required('Không được để trống bằng cấp')
});

export const defaultValues = {
  name: '',
  degree: ''
};

export interface IFormValue {
  name: string;
  degree: string;
}
