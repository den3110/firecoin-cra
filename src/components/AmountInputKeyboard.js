import { Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { useDesktop } from "@/hooks/responsives";
import { useTranslations } from "next-intl";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import BalanceContext from "@/contexts/BalanceContext";

const AmountInputKeyboard = ({ inputOpened, onInputOpened, amount, onChange }) => {
    const t = useTranslations();
    const isDesktop = useDesktop();
    const [stringAmount, setStringAmount] = useState(amount || "0");

    const [numberAmount, setNumberAmount] = useState(0);

    const { data } = useSpotBalancesQuery();
    const [selectedBalance, setSelectedBalance] = useContext(BalanceContext);

    const handleSetAmount = (value) => {
        return () => {
            setStringAmount(value);
        };
    };

    const handleAppendAmount = (value) => {
        return () => {
            if (value === "." && stringAmount.includes(".")) {
                return;
            }

            setStringAmount(stringAmount == 0 ? value : "" + stringAmount + value);
        };
    };

    const handleDeleteAmount = () => {
        const str = stringAmount.toString().slice(0, -1);
        setStringAmount(str == "" ? 0 : str);
    };

    const handleIncreaseAmount = (value) => {
        return () => {
            setStringAmount(numberAmount + value);
        };
    };

    const handleDone = () => {
        onInputOpened(false);
        onChange?.(numberAmount);
    };

    const handleSetAll = () => {
        setStringAmount(selectedBalance === "LIVE" ? data?.d.availableBalance : data?.d.demoBalance);
    };

    useEffect(() => {
        setStringAmount(amount.toString() || "0");
    }, [amount]);

    useEffect(() => {
        setNumberAmount(parseFloat(stringAmount));
    }, [stringAmount]);

    return (
        <Transition show={!isDesktop && inputOpened}>
            <Transition.Child
                as="div"
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="bg-secondary/50 fixed top-0 left-0 w-screen h-dvh z-[9999]"
                onClick={handleDone}
            ></Transition.Child>
            {/*slide up from bottom*/}
            <Transition.Child
                enter="transition-transform duration-500"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition-transform duration-500"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
                className="z-[9999] h-[460px] sm:h-[calc(100vh-40px)] w-screen sm:w-[38%] fixed left-0 right-0 bottom-0 select-non flex flex-col"
            >
                <div className="h-[160px] flex flex-col">
                    <div className="p-5 bg-custom-chart-title rounded-t-[20px]">
                        <span className="block text-[1.05rem] text-light leading-[0.48rem]">
                            {t("keyboard_trade_amount")}
                        </span>
                    </div>
                    <div className="flex-1 bg-secondary">
                        <div className="flex mt-5 mr-2 mb-[0.6rem] ml-2">
                            <button
                                className="py-[1px] px-1.5 bg-light/[.15] text-light text-xl rounded lg:w-auto min-w-[83px] sm:min-w-[30px] min-h-[42px] leading-[1.5rem] font-bold"
                                onClick={handleIncreaseAmount(-5)}
                            >
                                <span className="hidden lg:block">-</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="2"
                                    viewBox="0 0 14 2"
                                    className="block mx-auto lg:hidden"
                                >
                                    <g id="search-zoom-in" transform="translate(-7.991 -13.991)">
                                        <line
                                            id="Line_1142"
                                            data-name="Line 1142"
                                            x1="12"
                                            transform="translate(8.991 14.991)"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></line>
                                    </g>
                                </svg>
                            </button>
                            <div className="flex-1 max-w-[200px] px-[5px] py-[2px] mx-1 rounded bg-transparent border border-light/[.15] text-light flex items-center relative">
                                <span className="text-lg">$</span>
                                <input
                                    className="w-full bg-transparent border-none focus:ring-0 px-[11px] py-[8px] min-w-[157px] lg:min-w-0 text-[1.05rem] font-normal leading-[1.25rem]"
                                    type="text"
                                    min={1}
                                    step={1}
                                    value={stringAmount}
                                    readOnly
                                />
                                <span
                                    className="text-light absolute right-1.5 top-1/2 pointer outline-0 -translate-y-1/2"
                                    onClick={handleSetAmount(0)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                        <g
                                            id="Group_11134"
                                            data-name="Group 11134"
                                            transform="translate(-1268.345 -28.345)"
                                        >
                                            <circle
                                                id="Ellipse_201"
                                                data-name="Ellipse 201"
                                                cx="10.5"
                                                cy="10.5"
                                                r="10.5"
                                                transform="translate(1268.345 28.345)"
                                                fill="currentColor"
                                                opacity="0.19"
                                            ></circle>
                                            <g id="e-remove" transform="translate(1274.624 34.624)">
                                                <path
                                                    id="Path_13784"
                                                    data-name="Path 13784"
                                                    d="M9.047,1.176a.568.568,0,0,0-.822,0L5.111,4.289,2,1.176a.568.568,0,0,0-.822,0,.568.568,0,0,0,0,.822L4.289,5.111,1.176,8.224a.568.568,0,0,0,0,.822.533.533,0,0,0,.411.176A.533.533,0,0,0,2,9.047L5.111,5.934,8.224,9.047a.568.568,0,0,0,.822,0,.568.568,0,0,0,0-.822L5.934,5.111,9.047,2A.568.568,0,0,0,9.047,1.176Z"
                                                    transform="translate(-1 -1)"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <button
                                className="py-[1px] px-1.5 bg-light/[.15] text-light text-xl rounded lg:w-auto min-w-[83px] sm:min-w-[30px] min-h-[42px] leading-[1.5rem] font-bold"
                                onClick={handleIncreaseAmount(5)}
                            >
                                <span className="hidden lg:block">+</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    className="block mx-auto lg:hidden"
                                >
                                    <g id="search-zoom-in" transform="translate(-7.991 -7.991)">
                                        <line
                                            id="Line_1141"
                                            data-name="Line 1141"
                                            y2="12"
                                            transform="translate(14.991 8.991)"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></line>
                                        <line
                                            id="Line_1142"
                                            data-name="Line 1142"
                                            x1="12"
                                            transform="translate(8.991 14.991)"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></line>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className="lg:my-4 order-first lg:order-none flex flex-row lg:flex-col items-center justify-center gap-1">
                            <div className="lg:mb-2">
                                <div className="flex justify-center items-center">
                                    <div className="lg:m-2 text-text text-[1.05rem]">{t("profit")}</div>
                                    <div className="ml-2 lg:ml-0 lg:my-2 text-up text-xl">
                                        {process.env.NEXT_PUBLIC_PROFIT_PERCENT}%
                                    </div>
                                </div>
                            </div>
                            <div className="text-success-50 text-[24px] lg:text-[1.625rem] leading-normal text-center font-[600]">
                                +$
                                {Math.floor(numberAmount * (1 + process.env.NEXT_PUBLIC_PROFIT_PERCENT / 100) * 100) /
                                    100}
                            </div>
                        </div>
                    </div>
                </div>
                <table className="flex-1 bg-secondary text-light  text-center">
                    <tbody>
                        <tr className="text-[1.26rem]">
                            <td className="bg-primary border border-secondary w-1/4" onClick={handleIncreaseAmount(5)}>
                                +5
                            </td>
                            <td className="bg-primary border border-secondary w-1/4" onClick={handleIncreaseAmount(10)}>
                                +10
                            </td>
                            <td className="bg-primary border border-secondary w-1/4" onClick={handleIncreaseAmount(50)}>
                                +50
                            </td>
                            <td
                                className="bg-primary border border-secondary w-1/4"
                                onClick={handleIncreaseAmount(100)}
                            >
                                +100
                            </td>
                        </tr>
                        <tr className="text-[1.05rem]">
                            <td className="w-1/4" onClick={handleAppendAmount("1")}>
                                1
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("2")}>
                                2
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("3")}>
                                3
                            </td>
                            <td className="w-14" rowSpan={2} onClick={handleSetAll}>
                                {t("all")}
                            </td>
                        </tr>
                        <tr className="text-[1.05rem]">
                            <td className="w-1/4" onClick={handleAppendAmount("4")}>
                                4
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("5")}>
                                5
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("6")}>
                                6
                            </td>
                        </tr>
                        <tr className="text-[1.05rem]">
                            <td className="w-1/4" onClick={handleAppendAmount("7")}>
                                7
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("8")}>
                                8
                            </td>
                            <td className="w-1/4" onClick={handleAppendAmount("9")}>
                                9
                            </td>
                            <td className="w-1/4 text-[1.26rem]" rowSpan={2} onClick={handleDone}>
                                {t("done")}
                            </td>
                        </tr>
                        <tr>
                            <td onClick={handleAppendAmount(".")}>.</td>
                            <td onClick={handleAppendAmount("0")}>0</td>
                            <td onClick={handleDeleteAmount}>
                                <span className="inline-block h-[30px] w-[30px] text-[1.05rem] align-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.361 36">
                                        <path
                                            id="del"
                                            fill="#fff"
                                            d="M29.4,19.7,35.6,26l1.7-1.7L31.1,18l6.3-6.3L35.6,10l-6.3,6.3L23.1,10l-1.7,1.7L27.6,18l-6.3,6.3L23.1,26l6.3-6.3ZM39.9,3.2a5.3,5.3,0,0,1,5.4,5.3v19a5.3,5.3,0,0,1-5.4,5.3h-20A5.4,5.4,0,0,1,16,31.2L3.5,18.8a1,1,0,0,1,0-1.5L16,4.8a5.4,5.4,0,0,1,3.9-1.6h20Zm0-3.2H20.7a8.6,8.6,0,0,0-6.2,2.6L1.3,15a4.2,4.2,0,0,0,0,6L14.6,33.4A8.6,8.6,0,0,0,20.7,36H39.9a8.5,8.5,0,0,0,8.5-8.5V8.5A8.5,8.5,0,0,0,39.9,0Z"
                                            transform="translate(-0.039)"
                                            className="cls-1"
                                        ></path>
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Transition.Child>
        </Transition>
    );
};

export default AmountInputKeyboard;
