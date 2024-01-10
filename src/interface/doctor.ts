export interface IDoctorFormValue {
  name: string;
  phone: string;
  email: string;
  position: string;
  DoB: string;
  degree_infor: string;
}

export interface IDoctor extends IDoctorFormValue {
  id: string;
  images: string[];
  doctor_detail: IDoctorDataProps[];
}

export interface IDoctorDataProps {
  created_at: string;
  doctor: number;
  id: number;
  image: string;
  updated_at: string;
}
