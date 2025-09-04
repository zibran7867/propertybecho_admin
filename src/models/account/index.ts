export interface ILoginRequestModel {
    email: string;
    password: string;
}

export interface ILoginResponseModel {
    id?: string;
    email?: string;
    phone?: string;
    role?: string;
    is_active?: boolean;
    token: string;
    first_name: string;
    last_name: string;
}

export interface IChangePasswordModel {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export interface IForgotPasswordEmailModel {
    email: string;
}

export interface IForgotPasswordOTPModel {
    otp: string;
}

export interface IForgotPasswordPasswordModel {
    password: string;
    confirmPassword: string;
}
