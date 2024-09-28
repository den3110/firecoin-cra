import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import SnackbarContainerProvider from "./SnackbarContainerProvider";
import ReduxProvider from "./ReduxProvider";
import ClientBasedLocaleProvider from "./ClientBasedLocaleProvider";
import LocaleProvider from "./LocaleProvider";
import "@fontsource/lato"; // Import fonts
import "@fontsource/sarabun"; 

import "../index.css"; // Import CSS file for local font

export default function RootLayout({ children }) {
  return (
    <div
      className={`font-sans antialiased font-normal text-sm leading-5`}
    >
      <LocaleProvider>
        <ReactQueryProvider>
          <ReduxProvider>
            <SnackbarContainerProvider>
              <ClientBasedLocaleProvider>
                {children}
              </ClientBasedLocaleProvider>
            </SnackbarContainerProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </LocaleProvider>
    </div>
  );
}
