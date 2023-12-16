// ...

import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().label("Last Name").trim().required().min(3).max(64),
  address: Yup.string().label("Address").trim().required().min(3),
  number: Yup.number().label("Number").required(),
  work: Yup.string().label("Work").oneOf(["unemployed", "employed"]),
  company: Yup.string().when("work", ([work], schema) => {
    if (work === "employed") {
      return schema.required().min(3).max(64);
    }
    return schema.notRequired();
  }),
  role: Yup.string().when("work", ([work], schema) => {
    if (work === "employed") {
      return schema.required().min(3).max(64);
    }
    return schema.notRequired();
  }),
});

export const  defaultValues = {
  email:'',
  password:'',
  confirm_password:'',
  phone_number:'',
};

export interface IFormValue {
  email:string,
  password:string,
  confirm_password:string,
  phone_number:string,
}