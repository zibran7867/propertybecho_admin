import { IBaseCreateRequest, IBaseUpdateRequest } from "../base-type";

export interface AreaModel extends IBaseCreateRequest,
    IBaseUpdateRequest {
    id?: number;
    name?: string;
    status?: string[];
}