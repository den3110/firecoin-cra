import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    initialState: {
        mobileMenuOpen: false,
        buyNowModalOpen: false,

        quickDepositModal: {
            open: false,
            amount: 0,
        },

        orderModalOpen: false,

        settingModalOpen: false,
        languageModalOpen: false,

        claimPopupModalOpen: false,

        quickDepositMobileOpen: false,
    },
    name: "general",
    reducers: {
        setBuyNowModalOpen(state, action) {
            state.buyNowModalOpen = action.payload;
        },

        setMobileMenuOpen(state, action) {
            state.mobileMenuOpen = action.payload;
        },

        setQuickDepositModal(state, action) {
            state.quickDepositModal = action.payload;
        },

        setOrderModalOpen(state, action) {
            state.orderModalOpen = action.payload;
        },

        setSettingModalOpen(state, action) {
            state.settingModalOpen = action.payload;
        },

        setLanguageModalOpen(state, action) {
            state.languageModalOpen = action.payload;
        },

        setClaimPopupModalOpen(state, action) {
            state.claimPopupModalOpen = action.payload;
        },

        setQuickDepositMobileOpen(state, action) {
            state.quickDepositMobileOpen = action.payload;
        },
    },
});

export const {
    setBuyNowModalOpen,
    setMobileMenuOpen,
    setQuickDepositModal,
    setOrderModalOpen,
    setSettingModalOpen,
    setLanguageModalOpen,
    setClaimPopupModalOpen,
    setQuickDepositMobileOpen,
} = generalSlice.actions;

export default generalSlice.reducer;
