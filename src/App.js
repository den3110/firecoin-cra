import "./App.css";
import RootLayout from "./providers/RootLayout";
import LandingLayout from "./app/[locale]/(landing)/layout";
import './i18n'
import { Route, Routes } from "react-router-dom";
import LoginPage from "./app/[locale]/(landing)/@drawer/login/page";
import LandingTwo from "./app/[locale]/(landing)/LandingTwo";
import RegisterPage from "./app/[locale]/(landing)/@drawer/register/page";
import PanelLayout from "./app/[locale]/(panel)/layout";
import IndexPage from "./app/[locale]/(panel)/index/page";
import AffiliateLayout from "./app/[locale]/(panel)/(affiliate)/layout";
import GeneralAffiliatePage from "./app/[locale]/(panel)/(affiliate)/affiliate/general/page";

function App() {
  return (
    <RootLayout>
      {/* show later */}
      {/* <LandingLayout>  */}
        {/* Nội dung của các trang sẽ được render tại đây */}
        {/* <div></div> */}
        <Routes>
          <Route path="/index" element={<PanelLayout>
            <IndexPage />
          </PanelLayout>} />
          <Route path="/affiliate/general" element={<PanelLayout>
            <AffiliateLayout>
              <GeneralAffiliatePage />
            </AffiliateLayout>
          </PanelLayout>} />
          <Route path="/login" element={<LandingLayout>
            <LoginPage />
          </LandingLayout>} />
          <Route path="/register" element={<LandingLayout>
            <RegisterPage />
          </LandingLayout>} />
          <Route path="/" element={<LandingLayout>
            <LandingTwo />
          </LandingLayout>} />
        </Routes>
      {/* </LandingLayout> */}
    </RootLayout>
  );
}

export default App;
