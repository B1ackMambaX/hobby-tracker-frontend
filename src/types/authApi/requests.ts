export interface RegisterUserRequest  {
    email: string;
    password: string;
    name: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}