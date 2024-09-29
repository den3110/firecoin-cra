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
import BalanceLayout from "./app/[locale]/(panel)/user/(balance)/layout";
// import BalanceDropdown from "./components/BalanceDropdown";
import BalancePage from "./app/[locale]/(panel)/user/(balance)/balance/page";
import BinaryWalletPage from "./app/[locale]/(panel)/user/(balance)/binary-wallet/page";
import ProfilePage from "./app/[locale]/(panel)/user/profile/page";
import TradeHistoryPage from "./app/[locale]/(panel)/user/trade-history/page";
import StreakChallengePage from "./app/[locale]/(panel)/streak-challenge/page";
import NotificationPage from "./app/[locale]/(panel)/notification/page";
import ForgotPasswordPage from "./app/[locale]/(landing)/@drawer/forgot-password/page";
import RegisterResendVerifyEmailPage from "./app/[locale]/(landing)/@drawer/register-resend-verify-email/page";
import AffiliateCommissionPage from "./app/[locale]/(panel)/(affiliate)/affiliate/commission/page";
import AffiliateManagementPage from "./app/[locale]/(panel)/(affiliate)/affiliate/management/page";
import UpgradeVipPage from "./app/[locale]/(panel)/(affiliate)/upgrade-vip/page";

function App() {
  return (
    <RootLayout>
      {/* show later */}
      {/* <LandingLayout>  */}
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
          <Route path="/affiliate/commission" element={<PanelLayout>
            <AffiliateLayout>
              <AffiliateCommissionPage />
            </AffiliateLayout>
          </PanelLayout>} />
          <Route path="/affiliate/management" element={<PanelLayout>
            <AffiliateLayout>
              <AffiliateManagementPage />
            </AffiliateLayout>
          </PanelLayout>} />
          <Route path="/upgrade-vip" element={<PanelLayout>
            <AffiliateLayout>
              <UpgradeVipPage />
            </AffiliateLayout>
          </PanelLayout>} />
          <Route path="/user/balance" element={<PanelLayout>
            <BalanceLayout>
              <BalancePage />
            </BalanceLayout>
          </PanelLayout>} />
          <Route path="/user/binary-wallet" element={<PanelLayout>
            <BalanceLayout>
              <BinaryWalletPage />
            </BalanceLayout>
          </PanelLayout>} />
          <Route path="/user/profile" element={<PanelLayout>
              <ProfilePage />
          </PanelLayout>} />
          <Route path="/user/trade-history" element={<PanelLayout>
              <TradeHistoryPage />
          </PanelLayout>} />
          <Route path="/streak-challenge" element={<PanelLayout>
              <StreakChallengePage />
          </PanelLayout>} />
          <Route path="/notification" element={<PanelLayout>
              <NotificationPage />
          </PanelLayout>} />
          <Route path="/login" element={<LandingLayout>
            <LandingTwo />
            <LoginPage />
          </LandingLayout>} />
          <Route path="/register" element={<LandingLayout>
            <LandingTwo />
            <RegisterPage />
          </LandingLayout>} />
          <Route path="/forgot-password" element={<LandingLayout>
            <LandingTwo />
            <ForgotPasswordPage />
          </LandingLayout>} />
          <Route path="/register-resend-verify-email" element={<LandingLayout>
            <LandingTwo />
            <RegisterResendVerifyEmailPage />
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
