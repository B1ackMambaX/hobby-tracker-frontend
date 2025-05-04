import User from "../models/User.ts";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface LogoutResponse {
    acknowledged: boolean;
    deletedCount: number;
}