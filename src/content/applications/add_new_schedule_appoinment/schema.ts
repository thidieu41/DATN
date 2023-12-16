// ...

import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống tên'),
  date: Yup.string().required('Không được để trống ngày'),
  number: Yup.string().required('Không được để trống số người'),
  phone_number: Yup.string().required('Không được để trống số điện thoại'),
  reason: Yup.string().required('Không được để trống lý do khám'),
});

export const  defaultValues = {
  name:'',
  date:'',
  number:'',
  phone_number:'',
  reason:''
};

export interface IFormValue {
  name:string,
  date:string,
  number:string,
  phone_number:string,
  reason:string
}