/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { ApiResponseModel } from "./api";
import httpService from "./http-service";
import { SearchResult } from "../models/base-type";

const endPointBaseURL = `area`;

const getAllAreas = async (): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/`);

const AddArea = async (requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/`, requestBody);

const UpdateArea = async (id : number, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`, requestBody);

const UpdateAreaStatus = async (id : string, requestBody: any): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/status/${id}`, requestBody);

const DeleteArea = async (id : number): Promise<AxiosResponse<ApiResponseModel<SearchResult<any>>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/${id}`);

export default {
    getAllAreas, AddArea, UpdateArea, UpdateAreaStatus, DeleteArea
};
