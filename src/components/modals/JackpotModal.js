"use client";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Button from "@/components/inputs/Button";
import { useDispatch, useSelector } from "react-redux";
import { setJackpot } from "@/store/jackpotReducer";
import { useRouter } from "@/navigation";
import { useEffect } from "react";

const JackpotModal = () => {
    const t = useTranslations();

    const router = useRouter();

    const data = useSelector((state) => state.jackpot.data);

    const dispatch = useDispatch();

    const open = !!data;

    const handleClose = () => {
        dispatch(setJackpot(null));
    };

    const handleClaim = () => {
        handleClose();

        router.push("/streak-challenge");
    };
    
    useEffect(() => {
        // add .no-scrollclass to body
        if (open) {
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, [open]);
    return (
        <Transition
            show={open}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="absolute z-[1051]"
        >
            <div className="jackpot-popup block text-light overflow-x-hidden overflow-y-auto fixed top-0 left-0 z-[1050] w-full h-full outline-0">
                <div className="modal-dialog min-w-auto w-[430px] top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-light absolute left-1/2 min-[576px]:max-w-[500px]">
                    <div className="border-[2px] border-jackpot-primary bg-secondarySidebar rounded-[30px] p-0 relative flex flex-col w-full outline-0">
                        <header
                            className={clsx(
                                "w-full flex flex-col items-center pt-[90px] relative justify-between p-4 rounded-t-[calc(0.3rem-1px)]",
                                "before:content-[''] before:block before:w-[494px] before:h-[294px] before:bg-[url('http://localhost:3001/assets2/images/img-2.png')] before:bg-cover before:absolute before:-translate-y-1/2",
                                "after:contet-[''] after:block after:w-[188px] after:h-[188px] after:bg-[url('http://localhost:3001/assets2/images/box-6.png')] after:bg-cover after:absolute after:-top-[120px] after:left-1/2 after:-translate-x-1/2",
                            )}
                        >
                            <span className="jackpot-icon-close" onClick={handleClose}></span>
                            <h2 className="text-[26px] font-bold leading-none text-jackpot-title uppercase mb-2.5">
                                {t("congratulation")}!
                            </h2>
                            <p className="text-lg">
                                {t("you_have_won_streak", {
                                    type: data?.type,
                                    streak: data?.cjScore,
                                })}
                            </p>
                        </header>
                        <div className="p-0 relative flex-1">
                            <div className="box-content text-center px-[30px]">
                                <span className="border-[2px] border-jackpot-text bg-jackpot-bg rounded-[10px] text-[26px] text-jackpot-text font-bold leading-none px-5 py-[15px] mb-[15px] inline-block">
                                    {data?.prize} USDT
                                </span>
                                <p>
                                    <span className="text-jackpot-text">{t("note")}: </span>
                                    {t("need_claim_your_prizes_continuous_win_new_streak")}
                                </p>
                            </div>
                        </div>
                        <footer className="pt-5 px-[30px] pb-10 flex justify-center flex-wrap items-center rounded-[calc(.3rem-1px)]">
                            <Button size="large" className="w-full font-normal" onClick={handleClaim}>
                                {t("claim_your_prizes_now")}
                            </Button>
                        </footer>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default JackpotModal;
