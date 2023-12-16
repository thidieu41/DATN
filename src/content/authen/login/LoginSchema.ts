// ...

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('First Name is required'),
});

export const  defaultValues = {
  email:'',
  password:''
};

export interface IFormValue {
  email:string,
  password:string
}