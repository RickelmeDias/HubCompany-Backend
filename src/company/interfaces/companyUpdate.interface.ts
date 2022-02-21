export interface ICompanyUpdate {
  requestId: number;
  cnpj: string;
  name?: string;
  new_cnpj?: string;
  description?: string;
  main_responsible?: number;
  responsibles?: Array<number>;
  places?: Array<number>;
}
