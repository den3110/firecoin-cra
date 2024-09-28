import LandingDrawer from "@/components/LandingDrawer";
import LoginForm from "@/components/forms/LoginForm";
import { Link } from "@/navigation";
import useAuth from "@/hooks/useAuth";
import TwoFactorAuthForm from "@/components/forms/TwoFactorAuthForm";
import { getCurrentSiteName } from "@/utils/clientInfo";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const {t } = useTranslation();

    const [auth] = useAuth();


    return (
        <LandingDrawer>
            {auth.twoFaToken ? (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-2 leading-[1.2]">
                        {t("twofactor_authentication")}
                    </div>
                    <TwoFactorAuthForm />
                </div>
            ) : (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">{t("log_in_to_your_account")}</div>
                    <LoginForm />
                </div>
            )}
            <div className="leading-tight">
                <div className="mb-2">
                    <span>{t("need_account", { domain: getCurrentSiteName() })}</span>
                    <Link href="/register" className="primary-link ml-2">
                        {t("register")}
                    </Link>
                </div>
                <div>
                    <span>{t("didnt_receive_a_confirmation_email")}</span>
                    <Link href="/register-resend-verify-email" className="primary-link ml-2">
                        {t("request_a_new_one")}
                    </Link>
                </div>
            </div>
        </LandingDrawer>
    );
};

export default LoginPage;
