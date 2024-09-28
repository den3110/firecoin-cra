// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import file dịch trực tiếp
import en from './locales/en.json';
import vi from './locales/vi.js';

i18n
  .use(initReactI18next) // Kết hợp với React
  .init({
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng
    debug: true, // Chạy chế độ debug (tuỳ chọn)

    resources: {
      en: {
        translation: en, // Bản dịch tiếng Anh
      },
      vi: {
        translation: vi, // Bản dịch tiếng Việt
      },
    },

    interpolation: {
      escapeValue: false, // React đã tự động thoát các giá trị
    },
  });

export default i18n;
