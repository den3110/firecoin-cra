import { Link } from "@/navigation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const BoxRank = ({ rank, onRankModal }) => {
    const { t } = useTranslation();

    const handleOpenRankModal = () => {
        onRankModal?.();
    };

    return (
        <>
            <div className="flex items-center">
                <div className="rank-number">
                    {rank > 0 && (
                        <div className={`relative w-[70px] h-[70px] z-[1] bg-no-repeat bg-cover rank-${rank}`}></div>
                    )}
                </div>
                {rank > 0 ? (
                    <div className="rank-text -ml-[30px] w-auto cursor-pointer" onClick={handleOpenRankModal}>
                        <p className="bg-secondary text-sm text-[#ffcf5c] border border-[#ffcf5c] rounded-[14px] py-2.5 pl-[30px] pr-4 mb-0 min-w-[155px] w-full max-w-[250px]">
                            <span className="align-middle">{t("agency_rank")} </span>
                            <span className="align-middle inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                                    <g id="c-question" transform="translate(0.396 0.396)">
                                        <g
                                            id="Ellipse_1825"
                                            data-name="Ellipse 1825"
                                            transform="translate(1.104 1.104)"
                                            fill="none"
                                            stroke="#facc00"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="1.5"
                                        >
                                            <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                            <circle cx="7" cy="7" r="7.75" fill="none"></circle>
                                        </g>
                                        <g id="question" transform="translate(0.26 2.819)">
                                            <path
                                                id="Path_30768"
                                                data-name="Path 30768"
                                                d="M7.218,6.93a2.78,2.78,0,0,1,.228-1.41,2.976,2.976,0,0,1,.8-.862c.753-.595,1.073-.9,1.073-1.541,0-.708-.528-.993-1.239-.993a3.986,3.986,0,0,0-1.906.525l-.479-1A5.021,5.021,0,0,1,8.177,1a2.685,2.685,0,0,1,1.775.548,1.863,1.863,0,0,1,.656,1.512,2.034,2.034,0,0,1-.5,1.4,6.163,6.163,0,0,1-.876.787,3.352,3.352,0,0,0-.71.69,1.71,1.71,0,0,0-.18.993H7.218Z"
                                                transform="translate(0)"
                                                fill="#facc00"
                                            ></path>
                                            <circle
                                                id="Ellipse_1827"
                                                data-name="Ellipse 1827"
                                                cx="0.779"
                                                cy="0.779"
                                                r="0.779"
                                                transform="translate(6.982 8.013)"
                                                fill="#facc00"
                                            ></circle>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="w-auto m-0">
                        <p className="text-danger border-danger pl-4 cursor-default text-sm border rounded-[14px] py-2.5 pr-2 mb-0 min-w-[155px] w-full max-w-[250px]">
                            {t("dont_have_agency_license")}
                        </p>
                    </div>
                )}
            </div>
            {rank >= 7 ? (
                <span className="opacity-30 pl-2 bg-[#82f92a]/[.12] border border-[#f9d921] rounded-[10px] relative text-[#f9d921] text-xs font-bold py-[7px] pr-2 whitespace-nowrap leading-[20px]">
                    Max Lv
                </span>
            ) : (
                <Link
                    href="/upgrade-vip"
                    className={clsx(
                        "bg-custom-vip-bg/[.12] border border-custom-vip rounded-[10px] relative text-custom-vip text-xs font-bold py-[7px] pr-2 pl-[26px] leading-[20px]",
                        "before:content-[''] before:block before:absolute before:left-2 before:top-1/2 before:-mt-1.5 before:w-[13px] before:h-[13px] before:bg-[url('http://localhost:3001/assets2/images/upgrade-lv.svg')] before:bg-no-repeat",
                    )}
                >
                    Upgrade Lv
                </Link>
            )}
        </>
    );
};

export default BoxRank;
