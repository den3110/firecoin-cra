import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    transferConfirm: false,
    amount: 0,
    nickName: "",
    verifyCode: "",
    address: "",
    memo: "",

    selectedTab: "deposit",
    selectedNetwork: "internal",

    showHistory: false,
    history: null,

    showExchange: false,
};

const balanceSlice = createSlice({
    name: "balance",
    initialState: { ...initialState },
    reducers: {
        showBalanceModal: (state, action) => {
            state.visible = true;

            state.selectedTab = action.payload || "deposit";
        },
        hideBalanceModal: (state) => {
            state.visible = false;
            state.transferConfirm = false;
        },
        showTransferConfirm: (state, action) => {
            state.visible = false;
            state.transferConfirm = true;

            state.amount = action.payload.amount;
            state.nickName = action.payload.nickName;
            state.memo = action.payload.memo;
        },
        setVerifyCode: (state, action) => {
            state.verifyCode = action.payload;
        },
        resetWithdraw: (state) => {
            state.visible = false;
            state.transferConfirm = false;
            state.amount = 0;
            state.nickName = "";
            state.verifyCode = "";
            state.address = "";
            state.memo = "";
        },
        setSelectTab: (state, action) => {
            state.selectedTab = action.payload;
        },
        setSelectedNetwork: (state, action) => {
            state.selectedNetwork = action.payload;
        },

        showHistory: (state, action) => {
            state.showHistory = true;
            state.history = action.payload;
        },
        hideHistory: (state) => {
            state.showHistory = false;
            state.history = null;
        },

        setShowExchange: (state, action) => {
            state.showExchange = action.payload;
        },
    },
});

export const {
    resetWithdraw,
    showBalanceModal,
    hideBalanceModal,
    showTransferConfirm,
    setVerifyCode,
    setSelectTab,
    setSelectedNetwork,
    showHistory,
    hideHistory,
    setShowExchange,
} = balanceSlice.actions;

export default balanceSlice.reducer;
