import { IBaseCreateRequest, IBaseUpdateRequest } from "../base-type";

export interface BuilderModel extends IBaseCreateRequest,
    IBaseUpdateRequest {
    id?: number;
    name?: string;
    status?: string[];
}