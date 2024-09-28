import { useEffect, useMemo, lazy, Suspense } from "react";
import useLocale from "@/hooks/useLocales";
import { Link } from "@/navigation";
import { useTranslation } from "react-i18next";
import { getCurrentLogoSmSvg } from "@/utils/clientInfo";

const LocaleSelect = lazy(() => import('@/components/LocaleSelect'));

function Footer({shouldShowFooter}) {
    const {t } = useTranslation();

    const {locale} = useLocale();

    return (
       <>
         {shouldShowFooter && (
                <footer className="bg-secondaryLanding border-t" style={{ borderTopColor: 'rgba(139,141,150,.28)', borderWidth: '1px !important' }}>
                    <div className="w-full pt-[40px] px-[15px] lg:px-[5.375rem] text-light">
                        <div className="relative">
                            <div className="flex flex-col lg:flex-row sm:py-12 border-b border-[rgba(139,141,150,.28)]">
                                <div className="flex-1 pr-5 pb-10 lg:pb-0">
                                    <img src={getCurrentLogoSmSvg()} alt="logo" width={245}  height={34.24} />
                                </div>
                                <div className="footer-links flex-[0.5] shrink-[1] basis-0 sm:ml-6 pb-10 lg:pb-0">
                                    <h4>{t("support")}</h4>
                                    <ul>
                                        <li>
                                            <Link
                                                target="_blank" href={`/public/Agency_Obligations/wl_Agency%20Obligations_${locale}.pdf`}
                                            >
                                                {t("agency_obligations")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faqs/privacy-policy">{t("privacy_policy")}</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="footer-links sm:ml-6 flex-1 pb-10 lg:pb-0">
                                    <h4>{t("security")}</h4>
                                    <ul>
                                        <li>
                                            <Link href="/faqs/terms-of-use">{t("terms_and_conditions")}</Link>
                                        </li>
                                        <li>
                                            <Link href="/faqs/risks-disclosure">{t("risks_disclosure")}</Link>
                                        </li>

                                        <li>
                                            <Link href="/faqs/liability-and-indemnity">
                                                {t("liability_and_indemnity")}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="sm:ml-6 flex-1 pb-10 pb-10 lg:pb-0">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <LocaleSelect />
                                    </Suspense>
                                </div>
                            </div>
                            <div className="py-12 text-light/60">
                                {t("Risk_Warning_Trading_and_investing_in_digital_options_involves_significant_level")}
                            </div>
                        </div>
                    </div>
                </footer>
            )}
       </>
    );
}

export default Footer;