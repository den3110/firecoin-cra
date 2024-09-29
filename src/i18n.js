// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import file dịch trực tiếp
import en from './locales/en.json';
import vi from './locales/vi.js';
import id from './locales/id.js';
import jp from './locales/jp.js';
import kr from './locales/kr.js';
import la from './locales/la.js';
import th from './locales/th.js';
import cn from './locales/cn.js';
import cm from './locales/cm.js';

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
      id: {
        translation: id, // Bản dịch tiếng Indo
      },
      jp: {
        translation: jp, // Bản dịch tiếng Japan
      },
      kr: {
        translation: kr, // Bản dịch tiếng Korea
      },
      la: {
        translation: la, // Bản dịch tiếng Latinh
      },
      th: {
        translation: th, // Bản dịch tiếng Thailand
      },
      cn: {
        translation: cn, // Bản dịch tiếng China
      },
      cm: {
        translation: cm, // Bản dịch tiếng Campuchia
      },
    },

    interpolation: {
      escapeValue: false, // React đã tự động thoát các giá trị
    },
  });

export default i18n;
