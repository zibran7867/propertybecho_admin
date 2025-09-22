/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { ApiResponseModel } from "./api";
import httpService from "./http-service";
import { Pagination, SearchResult } from "../models/base-type";
import { SortDescriptor } from "@heroui/react";
import { Sorting } from "../shared/constants/pagination";

const endPointBaseURL = `builder`;

const getAllBuilders = async (
    search?: string,
    status?: string,
    pagination?: Pagination,
    sort?: SortDescriptor
): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/?search=${search ?? ''}&status=${status ?? ""}&limit=${pagination?.limit ?? 10}&page=${pagination?.page ?? 1}&sortOrder=${sort?.direction ? Sorting[sort?.direction] : ""}`);

const AddBuilder = async (requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/`, requestBody);

const UpdateBuilder = async (id : number, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`, requestBody);

const UpdateStatusBuilder = async (id : string, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/status/${id}`, requestBody);

const DeleteBuilder = async (id : number): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`);

export default {
    getAllBuilders, AddBuilder, UpdateBuilder, DeleteBuilder, UpdateStatusBuilder
};
