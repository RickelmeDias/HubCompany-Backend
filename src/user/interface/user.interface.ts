export interface User {
  id?: number;
  name: string;
  email: string;
  cep?: string;
  phone?: string;
  password?: string;
  createdAt?: Date;
}
