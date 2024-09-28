import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    initialState: {
        initialized: false,
        twoFaToken: null,
        token: null,
        user: null,
    },
    name: "auth",
    reducers: {
        setAuth(state, action) {
            if (action.payload.initialized !== undefined) {
                state.initialized = action.payload.initialized;
            }

            if (action.payload.twoFaToken !== undefined) {
                state.twoFaToken = action.payload.twoFaToken;
            }

            if (action.payload.token !== undefined) {
                state.token = action.payload.token;
            }

            if (action.payload.user !== undefined) {
                state.user = action.payload.user;
            }
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
