import { useTranslations } from "next-intl";
import Formatter from "@/utils/Formatter";
import HideBalance from "@/components/HideBalance";
import clsx from "clsx";
import HideInfo from "../HideInfo";

const ProfitStats = ({ data }) => {
    const t = useTranslations();

    return (
        <div className="mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="mb-4 lg:px-[15px]">
                    <div className="bg-gradient-primary rounded-[14px] lg:mt-5 p-[30px] flex justify-around">
                        <div className="flex-1 flex max-w-[300px]">
                            <div className="w-[24px] h-[23px] mr-[5px] max-w-[60px] basis-[60px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="43.525"
                                    height="40.623"
                                    viewBox="0 0 43.525 40.623"
                                    className="h-[55px]"
                                >
                                    <g id="bar-graph-profit" transform="translate(0 -1)" className="opacity-[.67]">
                                        <path
                                            id="Path_29851"
                                            data-name="Path 29851"
                                            d="M42.074,38.722H40.623V2.451A1.451,1.451,0,0,0,39.173,1h-5.8a1.451,1.451,0,0,0-1.451,1.451V38.722h-5.8V14.058a1.451,1.451,0,0,0-1.451-1.451h-5.8a1.451,1.451,0,0,0-1.451,1.451V38.722h-5.8V25.664a1.451,1.451,0,0,0-1.451-1.451h-5.8A1.451,1.451,0,0,0,2.9,25.664V38.722H1.451a1.451,1.451,0,0,0,0,2.9H42.074a1.451,1.451,0,1,0,0-2.9Z"
                                            fill="#ffffff"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-xl text-light/[0.67] mb-3 leading-[20px]">{t("total_profit")}</div>
                                <div className="flex leading-[20px] text-[30px]">
                                <HideInfo  placehodler="******">
                                <HideBalance>
                                        <div>{data?.profits < 0 && "-"}$</div>
                                        <div className="">{Formatter.formatNumber(Math.abs(data?.profits || 0))}</div>
                                    </HideBalance>
                        </HideInfo>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4 lg:px-[15px]">
                    <div className="bg-up rounded-[14px] lg:mt-5 p-[30px] flex justify-around">
                        <div className="flex-1 flex max-w-[300px]">
                            <div className="w-[24px] h-[23px] mr-[5px] max-w-[60px] basis-[60px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="49.009"
                                    height="55.129"
                                    viewBox="0 0 49.009 55.129"
                                >
                                    <g className="opacity-[.67]" transform="translate(-4.441 -1)">
                                        <path
                                            id="Path_29852"
                                            data-name="Path 29852"
                                            d="M30.559,1A11.559,11.559,0,1,0,42.119,12.559,11.559,11.559,0,0,0,30.559,1Zm5.075,12.188-4.446,4.446a.889.889,0,0,1-1.257,0l-4.446-4.446a.889.889,0,0,1,0-1.257l4.446-4.446a.889.889,0,0,1,1.257,0l4.446,4.446A.889.889,0,0,1,35.634,13.188Z"
                                            transform="translate(-1.613)"
                                            fill="#ffffff"
                                        ></path>
                                        <path
                                            id="Path_29853"
                                            data-name="Path 29853"
                                            d="M19.367,49l1.459,11.67a.889.889,0,0,0,.882.779H39.492a.889.889,0,0,0,.882-.779L41.833,49Z"
                                            transform="translate(-1.654 -5.32)"
                                            fill="#ffffff"
                                        ></path>
                                        <path
                                            id="Path_29854"
                                            data-name="Path 29854"
                                            d="M53.149,32.773a15.086,15.086,0,0,0-23.314,4.239V28.95c-.3.019-.589.044-.889.044s-.594-.026-.889-.044v8.062A15.086,15.086,0,0,0,4.742,32.773a.889.889,0,0,0,0,1.334,15.056,15.056,0,0,0,19.339.513,13.3,13.3,0,0,1,3.93,8.6H18.276a.889.889,0,0,0-.882,1l.1.779H40.4l.1-.779a.889.889,0,0,0-.882-1H29.88a13.3,13.3,0,0,1,3.93-8.6,15.056,15.056,0,0,0,19.339-.513.889.889,0,0,0,0-1.334Z"
                                            transform="translate(0 -3.098)"
                                            fill="#ffffff"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-xl text-light/[0.67] mb-3 leading-[20px]">{t("total_gain")}</div>
                                <div className="flex leading-[20px] text-[30px]">
                                <HideInfo  placehodler="******">
                                <HideBalance>
                                        <div>{data?.revenue < 0 && "-"}$</div>
                                        <div className="">{Formatter.formatNumber(Math.abs(data?.revenue || 0))}</div>
                                    </HideBalance>
                        </HideInfo>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:pt-4 px-[15px] lg:col-span-2">
                    <div className="text-text text-xl leading-[24px] mb-4 text-center">{t("trades_summary")}</div>
                    <div
                        className={clsx(
                            "rounded-[10px] h-2.5 flex justify-end mb-2",
                            data?.up_rate > 0 ? "bg-down" : "bg-secondary-400",
                        )}
                    >
                        <div className="rounded h-full bg-up" style={{ width: (data?.up_rate * 100 || 0) + "%" }}></div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="flex justify-between text-[17px] font-bold">
                        <div className="flex items-center gap-1 ml-6">
                            <div className="uppercase">{t("sell")}</div>
                            <div className="text-base text-down">
                            <HideInfo  placehodler="***">
                           {Formatter.formatNumber(data?.down_rate * 100 || 0, 2)}%

                        </HideInfo>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mr-6">
                            <div className="text-base">
                            <HideInfo  placehodler="***">
                            {Formatter.formatNumber(data?.up_rate * 100 || 0, 2)}%
                        </HideInfo>
                                </div>
                            <div className="uppercase text-up">{t("buy")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitStats;
