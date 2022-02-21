export interface IPlaceCreate {
  requestId: number;
  name: string;
  cep: string;
  number: string;
  company_id: number;
  main_responsible: number;
  responsibles?: Array<number>;
  createdAt: Date;
}
