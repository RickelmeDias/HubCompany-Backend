export interface ICompanyUpdate {
  requestId: number;
  cnpj: string;
  name?: string;
  new_cnpj?: string;
  description?: string;
}
