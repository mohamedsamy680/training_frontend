//###1) USED WITH ENDPOINT DISPLAYED IN GRID VIEW
export interface IApiPagedResponse<T> {
    version: string;
    statusCode: number;
    message: string;
    result: IResult<T>;
}
export interface IResult<T> {
    data: T;
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
}

//###2) USED WITH ALL OTHER VERSION 2 ENDPOINTS
export class WrappedResponse<T> {
  message: string;
  result: T;
  statusCode: number;
  version: number;
}


//# END ---------------------------------- USUAL USED #//



export interface IApiSuccessResponse<T> {
  version: string;
  statusCode: number;
  message: string;
  result: T;
}

export interface IPagingRequest {
    pageNumber: number;
    pageSize: number;
}

export interface IApiErrorResponse {
    version: string;
    statusCode: number;
    isError: boolean;
    responseException: IResponseException;
}

export interface IResponseException {
    exceptionMessage: string;
}

export interface IApiResponseError {
    isError: boolean;
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    extensions: IExtensions;
}

interface IExtensions {
}

export interface IDeleteResponse {
    isDeletedSuccess: boolean;
    deletedMessage?: string;
}

export class WrappedErrorResponse {
    message: string;
    result: any;
    statusCode: number;
    version: number;
}

export interface IBaseActionCall {
    resUserId:number;
}
