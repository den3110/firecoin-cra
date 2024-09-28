import React from 'react';
import { Link, usePathname, useRouter } from "@/navigation";
// import Image from "next/image";
import { getCurrentLogoSmSvg, getCurrentLogoSvg } from '@/utils/clientInfo';
import { useTranslation } from 'react-i18next';

function HeaderLanding(props) {
    const {t } = useTranslation();

    return (
        <div className="header-master">
        <div className="box-header z-[3000]">
            <div className="flex justify-between items-center w-full">
                <div className="left-nav h-full flex items-center">
                    <Link href="/" className="hidden lg:block h-[50px] items-stretch">
                        <img src={getCurrentLogoSvg()} alt="logo" className="h-[50px] w-[162px]" width="162" height="50" />
                    </Link>
                    <Link href="/" className="block lg:hidden h-[32px] items-stretch">
                        <img src={getCurrentLogoSmSvg()} alt="logo" className="h-[32px] w-[130px]" width="130" height="32"/>
                    </Link>
                </div>
                <div className="right-nav justify-end">
                    <div className="pr-0 flex items-center lg:pr-2">
                        <Link
                            href="/register"
                            className="block mr-1 lg:mr-4 px-[10px] lg:px-5 py-[7px] lg:py-[11px] bg-gradient-primary rounded-[3px] lg:rounded-[0.625rem] text-xs lg:text-lg text-secondary-50 font-bold !leading-5"
                        >
                            {t("joinnow")}
                        </Link>
                        <Link
                            href="/login"
                            className="block mr-1 lg:mr-4 px-[10px] lg:px-5 py-[7px] lg:py-[11px] bg-secondary-400 rounded-[3px] lg:rounded-[0.625rem] text-xs lg:text-lg text-secondary-50 font-bold !leading-5 hover:text-primary hover:opacity-60 transition-[opacity,color]"
                        >
                            {t("login")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default HeaderLanding;