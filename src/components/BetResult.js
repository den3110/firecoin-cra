import iconWinDemo from "@/assets/images/icon-win-demo.svg";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Formatter from "@/utils/Formatter";
import SocketClient from "@/services/SocketClient";
import { Transition } from "@headlessui/react";
import SocketContext from "@/contexts/SocketContext";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import UIContext from "@/contexts/UIContext";
import { getCurrentIconWin } from "@/utils/clientInfo";
import { useDesktop } from "@/hooks/responsives";
import clsx from "clsx";
import { useRouter } from "@/navigation";



const BetResult = () => {
    const t = useTranslations();
    const isDesktop = useDesktop();
    const router = useRouter();

    const [winAmount, setWinAmount] = useState(0);
    const [isDemo, setIsDemo] = useState(false);
    const [visible, setVisible] = useState(false);
    const [shouldShowDemo, setShouldShowDemo] = useState(false);

    const { socketInitialized } = useContext(SocketContext);
    const { setTotalOpenHistory } = useContext(UIContext);

    const winAudioRef = useRef(null);
    const loseAudioRef = useRef(null);
    const betAudioRef = useRef(null);

    const { refetch } = useSpotBalancesQuery();

    const handleResult = useCallback(
        (data) => {
            refetch().then();

            setTotalOpenHistory(0);

            if (data.result === "WIN") {
                if (localStorage.getItem("SoundEnabled") !== 'false') {
                    winAudioRef.current.play();
                }

                setWinAmount(data.winAmount);
                setIsDemo(data.accountType === "DEMO");
                setShouldShowDemo(data.accountType === "DEMO" && Math.random() <= 0.5);
                setVisible(true);

                setTimeout(() => {
                    setVisible(false);
                }, 5000);
                return;
            }

            if (data.result === "LOSE") {
                if (localStorage.getItem("SoundEnabled") !== 'false') {
                    loseAudioRef.current.play();
                }
                return;
            }
        },
        [refetch, setTotalOpenHistory],
    );

    const handleClose = useCallback(() => {
        setVisible(false);
        setShouldShowDemo(false);
    }, []);

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().on("BO_RESULT", handleResult);

        return () => {
            SocketClient.getInstance().socket().off("BO_RESULT", handleResult);
        };
    }, [handleResult, socketInitialized]);


    const handleDepositNowClick = ()=>{
        router.push('/user/binary-wallet');
    }

    return (
        <>
            <div className="w-0 h-0">
                <audio ref={loseAudioRef} id="lose" preload="auto">
                    <source src="/assets/media/lose-n.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={winAudioRef} id="win" preload="auto">
                <source src="/assets/media/win-n.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={betAudioRef} id="bet" preload="auto">
                <source src="/assets/media/order-n.mp3" type="audio/mpeg" />
                </audio>
            </div>

           
            <Transition
                show={visible}
                // enter="transition-opacity duration-300"
                // enterFrom="opacity-0"
                // enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed w-screen h-dvh top-0 left-0 z-[100000]"
            >
                 {!isDesktop && shouldShowDemo ? <>
                   
            <div
                className="z-[9999] fixed top-0 left-0 w-full h-full bg-secondary lg:bg-transparent"
            >
                <div className="modal-dialog text-light mx-auto lg:my-7 w-full lg:w-auto h-full lg:h-auto lg:min-w-[500px] min-w-[576px]:max-w-[500px] absolute lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 pointer-events-auto">
                    <div className="modal-content-info h-full">
                        <button
                            className={clsx(
                                "text-light w-[30px] h-[30px] rounded-full absolute top-[7px] right-[5px] lg:-top-[5px] lg:-right-[35px] lg:bg-light/30 flex items-center justify-center",
                                "z-[10000] float-right text-[1.5rem] font-bold leading-none [text-shadow:0_1px_0_#fff] opacity-50",
                            )}
                            onClick={handleClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 overflow-hidden">
                                <g
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                    strokeWidth="2"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    className="nc-icon-wrapper"
                                >
                                    <g className="nc-interact_menu-close-2-o-32">
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 6h28"
                                            transform="translate(0 10.00) rotate(45.00 16 6)"
                                        ></path>
                                        <path
                                            data-color="color-2"
                                            fill="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 16h28"
                                            opacity="0"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 26h28"
                                            transform="translate(0 -10) rotate(-45 16 26)"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <div className="h-full">
                            <div className="rounded-[5px] bg-custom-chart-title h-full w-[400px] mb-2.5 text-light">
                                <div className="h-full w-full relative">
                                    <img
                                        src={iconWinDemo}
                                        alt="icon win demo"
                                        className="absolute top-[30px] left-1/2 -translate-x-1/2 translate-y-[30%] w-[100px] h-[100px] max-w-full"
                                    />
                                    <div className="py-0 w-full h-full relative text-center">
                                        <div className="pt-[180px]">
                                            <p className="text-xl font-bold mb-[15px] leading-[1.5]">
                                                {t("if_you_had_traded_on_a_real_account_you_would_have_earned")}
                                            </p>
                                            <p className="text-up text-[2.2rem] leading-[1] font-bold mb-4">
                                                +{Formatter.formatCurrency(winAmount)}
                                            </p>
                                        </div>
                                        <button onClick={handleDepositNowClick} className="max-w-[340px] w-full py-2.5 font-bold text-light rounded-[5px] bg-up">
                                            {t("Deposit_now")}
                                        </button>
                                    </div>
                                    <span className="cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13.21"
                                            height="13.21"
                                            viewBox="0 0 13.21 13.21"
                                            className="absolute -right-[30px] top-0"
                                            onClick={handleClose}
                                        >
                                            <path
                                                id="Path_2957"
                                                data-name="Path 2957"
                                                d="M13.823,1.387a1.321,1.321,0,0,0-1.868,0L7.6,5.737l-4.35-4.35A1.321,1.321,0,1,0,1.387,3.255L5.737,7.6l-4.35,4.35a1.321,1.321,0,1,0,1.868,1.868L7.6,9.473l4.35,4.35a1.321,1.321,0,1,0,1.868-1.868L9.473,7.6l4.35-4.35A1.321,1.321,0,0,0,13.823,1.387Z"
                                                transform="translate(-1 -1)"
                                                fill="#fff"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            </> : <>
            <div className="mask-betResult"></div>
                  <div className="fixed mt-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100000]">
                  <div className="bg-secondary/70 absolute w-full h-full top-0 left-0"></div>
                <div className="mx-auto sm:px-5 relative w-screen sm:w-[450px] top-1/2 -translate-y-1/2 h-auto">
                    {!shouldShowDemo ? (
                        <div className="flex justify-center">
                            <div className="win-bg bg-contain h-[183px] w-[350px] sm:h-[214px] sm:w-[444px] bg-no-repeat mb-2.5 text-light">
                                <div className="h-full w-full relative">
                                    <img
                                        src={getCurrentIconWin()}
                                        alt="icon win"
                                        width="205"
                                        height="50"
                                        className="absolute bottom-[86%] left-[50%] w-[205px] -translate-x-[50%] translate-y-[30%]"
                                    />
                                    {isDemo && (
                                        <span className="absolute top-[25px] right-[25px] text-light font-bold bg-primary rounded px-2">
                                            Demo
                                        </span>
                                    )}
                                    <div className="h-full w-full px-8 flex justify-center items-center flex-col">
                                        <div className="mt-5 text-[1.75rem] font-bold mb-7 text-light">
                                            {t("congratulation")}!
                                        </div>
                                        <span className="block text-up font-bold text-[2.5rem]">
                                            +{Formatter.formatCurrency(winAmount)}
                                        </span>
                                    </div>
                                    <span className="cursor-pointer text-light" onClick={handleClose}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13.21"
                                            height="13.21"
                                            viewBox="0 0 13.21 13.21"
                                            className="absolute -right-[10px] sm:-right-[30px] top-[15px]"
                                        >
                                            <path
                                                id="Path_2957"
                                                data-name="Path 2957"
                                                d="M13.823,1.387a1.321,1.321,0,0,0-1.868,0L7.6,5.737l-4.35-4.35A1.321,1.321,0,1,0,1.387,3.255L5.737,7.6l-4.35,4.35a1.321,1.321,0,1,0,1.868,1.868L7.6,9.473l4.35,4.35a1.321,1.321,0,1,0,1.868-1.868L9.473,7.6l4.35-4.35A1.321,1.321,0,0,0,13.823,1.387Z"
                                                transform="translate(-1 -1)"
                                                fill="#fff"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                        <div className="rounded-[5px] bg-custom-chart-title h-[319px] w-[400px] mb-2.5 text-light">
                            <div className="h-full w-full relative">
                                <img
                                    src={iconWinDemo}
                                    alt="icon win demo"
                                    className="absolute -top-[25px] left-1/2 -translate-x-1/2 translate-y-[30%] w-[120px] h-[120px] max-w-full"
                                />
                                <div className="px-6 py-0 w-full h-full relative text-center">
                                    <div className="pt-[140px]">
                                        <p className="text-xl font-bold mb-[15px] leading-[1.5]">
                                            {t("if_you_had_traded_on_a_real_account_you_would_have_earned")}
                                        </p>
                                        <p className="text-up text-[2.2rem] leading-[1] font-bold mb-4">
                                            +{winAmount}$
                                        </p>
                                    </div>
                                    <button onClick={handleDepositNowClick} className="max-w-[340px] w-full py-2.5 font-bold text-light rounded-[5px] bg-up">
                                        {t("Deposit_now")}
                                    </button>
                                </div>
                                <span className="cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.21"
                                        height="13.21"
                                        viewBox="0 0 13.21 13.21"
                                        className="absolute -right-[30px] top-0"
                                        onClick={handleClose}
                                    >
                                        <path
                                            id="Path_2957"
                                            data-name="Path 2957"
                                            d="M13.823,1.387a1.321,1.321,0,0,0-1.868,0L7.6,5.737l-4.35-4.35A1.321,1.321,0,1,0,1.387,3.255L5.737,7.6l-4.35,4.35a1.321,1.321,0,1,0,1.868,1.868L7.6,9.473l4.35,4.35a1.321,1.321,0,1,0,1.868-1.868L9.473,7.6l4.35-4.35A1.321,1.321,0,0,0,13.823,1.387Z"
                                            transform="translate(-1 -1)"
                                            fill="#fff"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div> 
                    )}
                </div>
  </div>    
            </>}

           
           

          
            </Transition>
        </>
    );
};


export default BetResult;
