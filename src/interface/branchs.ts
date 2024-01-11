import { IDoctor } from './doctor';

export interface IBranchsParamsProps {
  name: string;
  address: string;
  phone: string;
  rooms: {
    name: string;
  }[];
  doctor: string;
}
export interface IBranchRoom {
  branch?: number;
  created_at?: string;
  id: number;
  name?: string;
  updated_at?: string;
}

export interface IBrachProps {
  id: string;
  name: string;
  address: string;
  created_at: string;
  phone: string;
  updated_at: string;
  branch_room: IBranchRoom[];
  doctor: IDoctor;
}
