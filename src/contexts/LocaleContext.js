import { createContext } from "react";

const initialState = {
    messages: {},
    locale: "en",
    changeLanguage: () => {},
};

// Tạo Context để quản lý ngôn ngữ
const LocaleContext = createContext({ ...initialState });

export default LocaleContext;
