import { useContext } from "react";
import UIContext from "@/contexts/UIContext";
import useAuth from "@/hooks/useAuth";
import Button from "./inputs/Button";
import { useRouter } from "@/navigation";
import { useTranslation } from "react-i18next";

const HideInfo = ({ children, placehodler = "******", isPage = false }) => {
    const [auth, _] = useAuth();

    const router = useRouter();

    const {t } = useTranslation();

    const goToSettings = () => {
        router.push("/user/profile");
    };

    if (auth?.user?.enable_hiding_info && !isPage) {
        return placehodler;
    }

    if (auth?.user?.enable_hiding_info && isPage) {
        return (
            <>
                <div className="flex justify-center h-screen mt-20 p-3">
                    <div className="text-center w-full lg:w-1/3">
                        <div className="mb-4">
                            <img
                                src={
                                    "data:image/png;base64,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"
                                }
                                alt="Logo"
                                className="mx-auto"
                            />
                        </div>
                        <h2 className="text-xl mb-4 text-white font-bold">{t("hide_sensitive_data")}</h2>
                        <p className="text-gray-500 mb-6">{t("hide_sensitive_data_guide")}</p>
                        <Button onClick={goToSettings} className="pl-10 pr-10 rounded-[5px]">
                            {t("go_to_setting")}
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    return children;
};

export default HideInfo;
