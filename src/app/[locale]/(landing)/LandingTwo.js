
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect } from "react";
import * as AOS from "aos";
import { useDesktop } from "@/hooks/responsives";

import "swiper/css";
import "./HomeTwo.scss";
import "aos/dist/aos.css";

import imgHome1 from "@/assets/images/home-02/1.png";
import imgHome2 from "@/assets/images/home-02/2.png";
import imgHome3 from "@/assets/images/home-02/3.png";

import imgBSC from "@/assets/images/home-02/BSC.png";
import imgBTC from "@/assets/images/home-02/BTC.png";
import imgUSDT from "@/assets/images/home-02/USDT.png";

import imgIconLogo from "@/assets/images/home-02/icon_logo.png";
import imgIconWeight from "@/assets/images/home-02/icon_weight.svg";
import imgIconBall from "@/assets/images/home-02/icon-ball.svg";
import imgIcons1 from "@/assets/images/home-02/icons-1.svg";
import imgIcons2 from "@/assets/images/home-02/icons-2.svg";
import imgIcons3 from "@/assets/images/home-02/icons-3.svg";
import imgIcons4 from "@/assets/images/home-02/icons-4.svg";
import imgIcons5 from "@/assets/images/home-02/icons-5.svg";
import imgIcons6 from "@/assets/images/home-02/icons-6.svg";
import imgIconArrowDown from "@/assets/images/home-02/icon-arrow-down.svg";
import { getCurrentSiteName } from "@/utils/clientInfo";
import smoothScrollTo from "@/utils/smoothScrollTo";





const LandingTwo = () => {
    const t = useTranslations();
    const isDesktop = useDesktop();

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        // add class "custom-bg-dark" to body
        document.body.classList.add("custom-bg-dark");

        return () => {
            document.body.classList.remove("custom-bg-dark");
        };
    }, []);


    
    
    return (
        <div className="w-full homepage">
            <section className="main-banner">
                <div className="main-banner-inner">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full lg:w-1/2 md:w-full sm:w-full px-4 main-banner-content">
                            <h3 className="main-banner-sub-title">{t("train_smarter_get_stronger")}</h3>
                            <h2 className="main-banner-title">{t("an_ideal_platform_to_earn")}</h2>
                            <p className="main-banner-description">
                                {t('site_is_the_world_premier_trading_platform', {site : getCurrentSiteName()})}
                           
                            </p>
                            <Link
                                href="/login"
                                className="mx-auto btn-start inline-flex w-[240px] mb-[110px] borderRounded font-20 text-decoration-none cl main-banner-link bg-gradient-primary text-center lg:text-left"
                            >
                                {t("get_start_for_free")}
                            </Link>
                        </div>
                        <div className="w-full lg:w-1/2 md:w-full sm:w-full px-4 mt-10 md:mt-0">
                        <img
            src={imgHome1}
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-offset="0"
            data-aos-delay="200"
            className="imgRight main-banner-img"
            alt=""
        />
                            {/* <img src={imgHome1} className="main-banner-img" /> */}
                        </div>
                    </div>

                    <span className="main-banner-icon"         onClick={() => smoothScrollTo('trading-platform')}
>
<img
            src={imgIconArrowDown}           
            alt=""
        />
                    </span>
                </div>
            </section>

            <section id="trading-platform" className="trading-platform">
                <div className="trading-platform-content">
                    <div className="flex flex-wrap items-center">
                        <div className="lg:w-1/2 w-full trading-platform-media">
                        <img
            src={imgHome2}
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-offset="0"
            data-aos-delay="200"
            className="imgRight trading-platform-image"
            alt=""
        />
                        </div>
                        <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
                            <div className="trading-platform-content-text">
                                <h2 className="trading-platform-title">
                                {t("our_indicators_help_customers_win_more")}
                                </h2>
                                <p className="trading-platform-desc">
                                {t("develops_extremely_advanced_but_simple_to_use", {site : getCurrentSiteName()})}                               
                                </p>
                                <Link
                                    href="/login"
                                    className="mx-auto btn-start inline-flex w-[240px] mb-[110px] borderRounded font-20 text-decoration-none cl main-banner-link bg-gradient-primary text-center lg:text-left"
                                >
                                    {t("get_start_for_free")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-we-work">
                <div className="how-we-work-content">
                    <h3 className="how-we-work-sub-title">{getCurrentSiteName()}</h3>
                    <h2 className="how-we-work-title">
                    <div dangerouslySetInnerHTML={{__html: t.raw('a_platform_built_on_innovation')}} />
                       
                    </h2>
                    <span className="how-we-work-icon">
                    <img
            src={imgIconLogo}           
            alt=""
        />
                    </span>
                    <ul className="how-we-work-list">
                        <li className="how-we-work-item">
                        <img
            src={imgIcons1}           
            alt=""
            className="how-we-work-item-icon"
        />
                          
                            <h4 className="how-we-work-item-title">Stable &amp; Secure</h4>
                            <p className="how-we-work-item-text">
                                Our platform is highly stable and available worldwide. We protect your assets with best
                                security methods.
                            </p>
                        </li>
                        <li className="how-we-work-item">
                        <img
            src={imgIcons2}           
            alt=""
            className="how-we-work-item-icon"
        />
                            <h4 className="how-we-work-item-title">Refer &amp; Earn</h4>
                            <p className="how-we-work-item-text">
                                Refer your friends and earn together by trading on {getCurrentSiteName()}.
                            </p>
                        </li>
                        <li className="how-we-work-item">
                        <img
            src={imgIcons3}           
            alt=""
            className="how-we-work-item-icon"
        />
                            <h4 className="how-we-work-item-title">Fast &amp; Free</h4>
                            <p className="how-we-work-item-text">
                                No deposit fee and small withdrawal fee. Transactions arrives within minutes.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="list-coin bg-gradient-primary">
                <div className="coin-wrap">
                    <div className="image-wrap">
                    <img
            src={imgBSC}           
            className="image"
            alt="bsc"
        />
                    </div>
                    <div className="image-wrap">
                    <img
            src={imgBTC}           
            className="image"
            alt="btc"
        />
                    </div>
                    <div className="image-wrap">
                    <img
            src={imgUSDT}           
            className="image"
            alt="usdt"
        />
                    </div>
                </div>
            </section>

            <section className="get-started-in-steps text-center">
                <div className="max-w-custom-container mx-auto pr-4 pl-4">
                    <h2 className="get-started-in-steps-title">
                    <div dangerouslySetInnerHTML={{__html: t.raw('ltptrade_get_started_title')}} />
                        {/* Get started in <span className="text-primary">5 minutes</span> */}
                    </h2>
                    <ul className="get-started-in-steps-list">
                        <li className="get-started-in-steps-item">
                            <span className="get-started-in-steps-item-icon">
                            <img
            src={imgIcons4}           
            alt=""
        />
                            </span>
                            <h3 className="get-started-in-steps-item-sub-title">Step 1</h3>
                            <h4 className="get-started-in-steps-item-title">                                {t('sign_up')}
</h4>
                            <p className="get-started-in-steps-item-text">
                                {t('ltptrade_get_started_description_1')}
                            </p>
                        </li>
                        <li className="get-started-in-steps-item">
                            <span className="get-started-in-steps-item-icon">
                            <img
            src={imgIcons5}           
            alt=""
        />
                            </span>
                            <h3 className="get-started-in-steps-item-sub-title">Step 2</h3>
                            <h4 className="get-started-in-steps-item-title">{t('deposit_fund')}</h4>
                            <p className="get-started-in-steps-item-text">{t('deposit_using_popular_cryptocurrency')}</p>
                        </li>
                        <li className="get-started-in-steps-item">
                            <span className="get-started-in-steps-item-icon">
                            <img
            src={imgIcons6}           
            alt=""
        />
                            </span>
                            <h3 className="get-started-in-steps-item-sub-title">Step 3</h3>
                            <h4 className="get-started-in-steps-item-title">{t('start_trading')}</h4>
                            <p className="get-started-in-steps-item-text">{t('make_money_predicting_the_price_of_assets')}</p>
                        </li>
                    </ul>
                    <div className="get-started-in-steps-icon">
                    <img
            src={imgIconWeight}           
            alt=""
        />
                    </div>
                </div>
            </section>

            <section className="our-portfolio">
                <div className="our-portfolio-inner text-center">
                    <div className="our-portfolio-image">
                    <img
            src={imgHome3}
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-offset="0"
            data-aos-delay="200"
            className="imgRight mx-auto"
            alt=""
        />
                    </div>
                    <div className="flex justify-center">
                        <div className="lg:w-2/3">
                            <h2 className="our-portfolio-title">
                            <div dangerouslySetInnerHTML={{__html: t.raw('anywhere_you_want')}} />
                            </h2>
                            <p className="our-portfolio-text">
                                {t('everyone_can_earn_sustainable', {site : getCurrentSiteName()})}                            
                            </p>
                            <Link
                                href="/login"
                                className="mx-auto btn-start inline-flex w-[240px] mb-[110px] borderRounded font-20 text-decoration-none cl main-banner-link bg-gradient-primary text-center lg:text-left"
                            >
                                {t("get_start_for_free")}
                            </Link>
                        </div>
                    </div>
                    <div className="our-portfolio-icon">
                    <img
            src={imgIconBall}           
            alt=""
        />
                    </div>
                </div>
            </section>
        </div>
    );
};
export default LandingTwo;
