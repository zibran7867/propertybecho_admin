/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { ApiResponseModel } from "./api";
import httpService from "./http-service";
import { SearchResult } from "../models/base-type";

const endPointBaseURL = `builder`;

const getAllBuilders = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/`);

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
