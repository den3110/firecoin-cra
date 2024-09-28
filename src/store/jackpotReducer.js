import { createSlice } from "@reduxjs/toolkit";

const jackpotSlice = createSlice({
    name: "jackpot",
    initialState: {
        data: null,
    },
    reducers: {
        setJackpot: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setJackpot } = jackpotSlice.actions;

export default jackpotSlice.reducer;
