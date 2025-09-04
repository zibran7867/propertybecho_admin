/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import messages from "../shared/constants/messages";
import { HttpStatusCode } from "../shared/enums/http-status-code";
import { adminLogout } from "../store/slices/authSlice";
import { showLoader } from "../store/slices/generalSlice";
import { IApplicationState } from "../store/state/app-state";
import store from "../store/store";
import { getBaseURL } from "../utils/commonFunctions";

interface AxiosErrors {
    message?: string,
    code?: string,
    config?: InternalAxiosRequestConfig,
    request?: any,
    response?: AxiosResponse,
}

function showLoaderdiv() {
    const loaderDiv = document.getElementById("loader");

    if (loaderDiv) {
        loaderDiv.style.display = "flex";
        loaderDiv.style.visibility = "visible";
    }
}

function hideLoader() {
    const loaderDiv = document.getElementById("loader");

    if (loaderDiv) {
        loaderDiv.style.display = "none";
        loaderDiv.style.visibility = "hidden";
    }
}
axios.interceptors.request.use(
    (config: any) => {
        const storeData: IApplicationState = store?.getState();
        let token = null;
        token = `bearer ${storeData?.UserData?.token}`;

        if (config.url) {
            const baseURL = import.meta.env.VITE_BASE_URL || "";
            config.url = getBaseURL(baseURL) + config.url;
        }
        config.headers = {
            ...config.headers,
            Authorization: token,
        };

        if (storeData?.GeneralData.showLoader) {
            showLoader(false);
            showLoaderdiv();
        } else {
            store.dispatch(showLoader(true));
        }
        return config;
    },
    (error: AxiosError) => {
        hideLoader();
        switch (error?.response?.status) {
            case HttpStatusCode.BadRequest:
            case HttpStatusCode.ConflictError:
            case HttpStatusCode.InternalServerError:
                toast.error(messages.InternalServerError);
                return;
        }
        return Promise.reject(messages.SomethingWentWrong);
    }
);

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        hideLoader();
        if (!response?.data?.status) {
            toast.error(response?.data?.message);
        }
        return response;
    },
    (error: AxiosErrors) => {
        hideLoader();

        switch (error.response?.status) {
            case HttpStatusCode.BadRequest:
                toast.error(error?.response?.data?.message);
                return;
            case HttpStatusCode.ConflictError:
                toast.error(error?.response?.data?.message);
                return;
            case HttpStatusCode.InternalServerError:
                toast.error(error?.response?.data?.message);
                return;
            case HttpStatusCode.Unauthorized:
                toast.error(error?.response?.data?.message);
                store.dispatch(adminLogout());
                return;
            case HttpStatusCode.Forbidden:
                toast.error(error?.response?.data?.message);
                store.dispatch(adminLogout());
                return;
            case HttpStatusCode.NotFound:
                toast.error(error?.response?.data?.message);
                store.dispatch(adminLogout());
                return;
        }

        return Promise.reject(messages.SomethingWentWrong);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
};
