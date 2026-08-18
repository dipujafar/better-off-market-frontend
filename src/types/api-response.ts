import { IMetaData } from ".";

export interface IApiResponse<T> {
  data: T;
  meta: IMetaData;
}

export interface IApiSingleDataResponse<T> {
  data: T;
}
