import { Category } from "./category";
import { Tag } from "./tag";

export interface UserForm {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  logo: string;
  email: string;
  password: string;
  phone: string;
  color: string;
  date: Date;
  category: Category;
  tag: Tag;
  gender: string;
  agree: boolean;
}
