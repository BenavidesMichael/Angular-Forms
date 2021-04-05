import { Category } from "./category";
import { Tag } from "./tag";

export interface UserFormCreate {
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
  phone: string;
  color: string;
  date: Date;
  gender: string;
  agree: boolean;
  tag: Tag[];
  category: Category;
  logo?: any;
}
