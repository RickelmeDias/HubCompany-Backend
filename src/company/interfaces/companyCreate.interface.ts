export interface ICompanyCreate {
  name: string;
  cnpj: string;
  description: string;
  main_responsible: number;
  responsibles?: Array<number>;
  createdAt: Date;
}
