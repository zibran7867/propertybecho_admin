/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { ApiResponseModel } from "./api";
import httpService from "./http-service";
import { Pagination, SearchResult } from "../models/base-type";
import { SortDescriptor } from "@heroui/react";
import { Sorting } from "../shared/constants/pagination";

const endPointBaseURL = `broker`;

const getAllBroker = async (
    status?: string,
    search?: string,
    pagination?: Pagination,
    sort?: SortDescriptor,
): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/all-brokers/?status=${status ?? ""}&search=${search ?? ''}&limit=${pagination?.limit ?? 10}&page=${pagination?.page ?? 1}&sortOrder=${sort?.direction ? Sorting[sort?.direction] : ""}`);

// const AddArea = async (requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
//     httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/`, requestBody);

// const UpdateArea = async (id: number, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
//     httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`, requestBody);

// const UpdateAreaStatus = async (id: string, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
//     httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/status/${id}`, requestBody);

// const DeleteArea = async (id: number): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
//     httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`);

export default {
    getAllBroker 
};
