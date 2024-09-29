// import { Lato, Sarabun } from "next/font/google";
// import localFont from "next/font/local";
import "@/app/globals.scss";
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import SnackbarContainerProvider from "@/providers/SnackbarContainerProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import ClientBasedLocaleProvider from "@/providers/ClientBasedLocaleProvider";
import LocaleProvider from "@/providers/LocaleProvider";

const sarabun = ({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "vietnamese", "thai"],
  display: "swap",
  variable: "--font-sarabun",
  style: ["normal", "italic"],
});

const frizonFont = ({
  src: "http://localhost:3001/assets2/fonts/Frizon.woff",
  display: "swap",
  variable: "--font-frizon",
});

// lato
const lato = ({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-lato",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Exchange The World",
  description: "Exchange The World",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <div
      className={`${sarabun.variable} ${frizonFont.variable} ${lato.variable} font-sans antialiased font-normal text-sm leading-5 aaaasd`}
    >
      <LocaleProvider>
        <ReactQueryProvider>
          <ReduxProvider>
            <SnackbarContainerProvider>
              <ClientBasedLocaleProvider>{children}</ClientBasedLocaleProvider>
            </SnackbarContainerProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </LocaleProvider>
    </div>
  );
}
