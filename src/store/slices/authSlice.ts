import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from "@/types/models/User.ts";


interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

interface CredentialsPayload {
    user: User;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<CredentialsPayload>) {
            state.user = action.payload.user;
        },
        logout: () => {
            localStorage.removeItem('accessToken');
            return initialState;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;