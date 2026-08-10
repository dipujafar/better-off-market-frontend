export interface IApiResponse<T> {
    data: T;
    meta?: {
       limit: number;
       page: number;
       total: number;
       totalPage: number;
    };
}