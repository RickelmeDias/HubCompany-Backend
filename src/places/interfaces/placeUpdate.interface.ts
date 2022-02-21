export interface IPlaceUpdate {
  placeId: number;
  requestId: number;
  name?: string;
  cep?: string;
  number?: string;
  main_responsible?: number;
  responsibles?: Array<number>;
}
