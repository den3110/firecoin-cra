import imgHomeSection1 from "@/assets/images/home-01/section-1.png";
import imgHomeLogoLightFooter from "@/assets/images/home-01/logo-light-footer.svg";
import imgHome2 from "@/assets/images/home-01/2.png";
import imgHome3 from "@/assets/images/home-01/3.png";
import imgHomeCheckIcon from "@/assets/images/home-01/check-icon.svg";
import imgHomeSection3BgLeft from "@/assets/images/home-01/section-3-bg-left.png";
import imgHome01 from "@/assets/images/home-01/01.png";
import imgHome02 from "@/assets/images/home-01/02.png";
import imgHome03 from "@/assets/images/home-01/03.png";
import imgHome4 from "@/assets/images/home-01/4.png";
import { useTranslation } from "react-i18next";
import { Link } from "@/navigation";
import { useEffect } from "react";
import * as AOS from "aos";
import { useDesktop } from "@/hooks/responsives";

import "swiper/css";
import "./HomeOne.scss";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurrentSiteName } from "@/utils/clientInfo";

const LandingOne = ()=>{
    const {t } = useTranslation();
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


    return  <div id="fibowin-wrapper" className="w-full max-w-screen overflow-y-hidden overflow-x-hidden ">
    <section className="main-banner overflow-y-hidden overflow-x-hidden">
        <div className="container-fluid main-banner-content">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-5">
                    <div
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="50"
                    >
                        <div className="main-banner-content-text">
                            <h2
                                className="main-banner-title"
                                dangerouslySetInnerHTML={{ __html: t.raw("fibowin_main_banner_title") }}
                            ></h2>
                            <p className="main-banner-desc">{t("fibowin_main_banner_subtitle")}</p>
                        </div>
                        <Link
                            href="/login"
                            className="mx-auto btn-start inline-flex w-[240px] mb-[110px] borderRounded font-20 text-decoration-none cl main-banner-link bg-gradient-primary text-center lg:text-left"
                        >
                            {t("get_start_for_free")}
                        </Link>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-7 flex justify-end relative">
                    <img
                        src={imgHomeSection1}
                        width="516"
                        height="381"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="100"
                        className="main-banner-image"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </section>
    <section className="info">
        <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-offset="0"
            data-aos-delay="50"
            className="bs-container-fluid content"
        >
            <img src={imgHomeLogoLightFooter} alt="Botrade" style={{ width: "auto", height: "auto" }} />
            <h2>{t("fibowin_trade_simple_title")}</h2>
            <p>{t("fibowin_trade_simple_subtitle")}</p>
        </div>
        <img
            src={imgHome2}
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-offset="0"
            data-aos-delay="200"
            className="imgRight"
            alt=""
        />
    </section>
    <section className="introduce text-center">
        <div className="container-fluid introduce-content">
            <Swiper slidesPerView={isDesktop ? 3 : 1} spaceBetween={60}>
                <SwiperSlide>
                    <div className="introduce-group">
                        <img
                            width="22"
                            height="22"
                            src={imgHomeCheckIcon}
                            className="security-item-icon"
                            alt="check-icon"
                        />
                        <h3 className="introduce-title">Free demo account</h3>
                        <p className="introduce-text">
                            Test your trading strategy as much as you want with $1,000 demo account.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="introduce-group">
                        <img
                            width="22"
                            height="22"
                            src={imgHomeCheckIcon}
                            className="security-item-icon"
                            alt="check-icon"
                        />

                        <h3 className="introduce-title">Low minimum deposit</h3>
                        <p className="introduce-text">Minimum deposit starting at $5 with no fee.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="introduce-group">
                        <img
                            width="22"
                            height="22"
                            src={imgHomeCheckIcon}
                            className="security-item-icon"
                            alt="check-icon"
                        />
                        <h3 className="introduce-title">Small minimum order</h3>
                        <p className="introduce-text">Start trading with only $1.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
    <section className="trade-faster">
        <div className="container-fluid trade-faster-content">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6 flex flex-col items-start justify-center content">
                    <h2
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="50"
                        className="trade-faster-title"
                        dangerouslySetInnerHTML={{ __html: t.raw("fibowin_trade_faster_title") }}
                    ></h2>
                    <p
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="100"
                        className="trade-faster-text"
                    >
                        {t("fibowin_trade_faster_text")}
                    </p>
                </div>
                <div className="lg:col-span-6 col-span-12 trade-faster-img-wrapper">
                    <img
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="100"
                        src={imgHome3}
                        alt=""
                        className="trade-faster-img inline-block"
                    />
                </div>
            </div>
        </div>
        <img src={imgHomeSection3BgLeft} alt="" className="trade-faster-img-left" />
    </section>
    <section className="option">
        <div className="container-fluid">
            <div>
                <div
                    data-aos="flip-right"
                    data-aos-duration="1000"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-offset="0"
                    data-aos-delay="50"
                    className="content"
                >
                    <h2>{t("fibowin_most_suitable_title")}</h2>
                    <p>
                    {getCurrentSiteName()} provides exceptional trading experience to our customers by simplified the
                        trading process so our traders can focus on making better decisions to increase their
                        profits.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-12 mx-[15px] lg:mx-0">
                <div
                    data-aos="fade-up"
                    data-aos-duration="1100"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-offset="0"
                    data-aos-delay="50"
                    className="col-span-12 lg:col-span-4 optionBox"
                >
                    <div className="imgBg">
                        <img alt="img home 01" src={imgHome01} />
                    </div>
                    <h3>{t("fibowin_most_suitable_block1_title")}</h3>
                    <p>{t("fibowin_most_suitable_block1_subtitle")}</p>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-offset="0"
                    data-aos-delay="50"
                    className="col-span-12 lg:col-span-4 optionBox"
                >
                    <div className="imgBg">
                        <img src={imgHome02} alt="img home 02" />
                    </div>
                    <h3>{t("fibowin_most_suitable_block2_title")}</h3>
                    <p>{t("fibowin_most_suitable_block2_subtitle")}</p>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-offset="0"
                    data-aos-delay="50"
                    className="col-span-12 lg:col-span-4 optionBox"
                >
                    <div className="imgBg">
                        <img src={imgHome03} alt="" />
                    </div>
                    <h3>{t("fibowin_most_suitable_block3_title")}</h3>
                    <p>{t("fibowin_most_suitable_block3_subtitle")}</p>
                </div>
            </div>
        </div>
    </section>
    <section className="joinfibowinNow flex items-end">
        <div className="bs-container">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-7 flex items-center">
                    <div
                        data-aos="fade-up-right"
                        data-aos-duration="1200"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-offset="0"
                        data-aos-delay="50"
                        className="content"
                    >
                        <h3>{t("start_trading_today")}</h3>
                        <p>Make money everywhere on { getCurrentSiteName()}!</p>
                        <Link
                            href="/login"
                            className="mx-auto btn-start button default borderRounded font-14 text-decoration-none cl"
                        >
                            {t("get_started_for_free")}
                        </Link>
                    </div>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-offset="0"
                    data-aos-delay="50"
                    className="col-span-12 lg:col-span-5"
                >
                    <div className="imgBg">
                        <img alt="img home 4" src={imgHome4} />
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
}
export default LandingOne