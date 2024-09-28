import { useTranslation } from "react-i18next";
import FaqNavigator from "@/app/[locale]/(landing)/faqs/_partials/FaqNavigator";

const FaqLayout = ({ children }) => {
    const {t } = useTranslation();

    return (
        <div className="w-full">
            <div className="w-full p-0">
                <div className="header max-[1700px]:min-h-[340px] min-[1700px]:min-h-[486px]  relative">
                    <div className="bs-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h4 className="text-center text-light mb-4 text-[1.75rem]">{t("how_can_we_help_you")}</h4>
                        <p className="text-center text-light mb-4">
                            {t("we_will_quickly_and_efficiently_respond_to_your_questions_what_would_you_like_to_know")}
                        </p>
                    </div>
                </div>
                <div className="content bg-light p-[30px]">
                    <div className="content-faqs">
                        <div className="flex flex-col-reverse lg:flex-row">
                            <div className="content flex flex-1 pl-2.5 pr-10 bg-light">{children}</div>
                            <div className="navigator lg:basis-[310px] max-w-[310px] mb-12 lg:mb-0">
                                <FaqNavigator />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqLayout;
