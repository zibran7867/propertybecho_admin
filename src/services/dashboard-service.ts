/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { ApiResponseModel } from "./api";
import httpService from "./http-service";

const endPointBaseURL = `admin/dashboard`;

const getAllDashboardTiles = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/`);

export default {
    getAllDashboardTiles,
};
