import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link, usePathname, useRouter } from "@/navigation";
import useAuth from "@/hooks/useAuth";
import clsx from "clsx";
import imgTournament from "@/assets/images/tournament.png";
// import Image from "next/image";

const Sidebar = () => {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const [auth, setAuth] = useAuth();

    const handleSignOut = (e) => {
        e?.preventDefault();
        router.push("/");
        setAuth({
            initialized: true,
            user: null,
        });
        localStorage.removeItem("USER_TOKEN");
    };

    return (
        <div className="w-[105px] min-w-[105px] text-base p-0 secondary-sidebar">
            <div
                className={clsx(
                    "z-[100] h-[calc(100%-65px)] w-[105px] fixed flex flex-col justify-between text-light-50 box-border",
                    {
                        "border-r-2 border-r-black secondary-sidebar": pathname.startsWith("/index"),
                        "secondary-sidebar": !pathname.startsWith("/index"),
                    },
                )}
            >
                <div>
                    <ul className="flex flex-col text-light-50">
                        <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%]">
                            <Link
                                href="/index"
                                className={clsx("flex flex-col items-center text-center no-hover", {
                                    "text-primary": pathname.startsWith("/index"),
                                })}
                            >
                                <span className="text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19.776"
                                        height="20.801"
                                        viewBox="0 0 19.776 20.801"
                                        className={
                                            pathname.startsWith("/index") ? "fill-current" : "fill-light text-light"
                                        }
                                    >
                                        <g id="bracket-arrow" transform="translate(0 21.189) rotate(-90)">
                                            <g
                                                id="Path_30752"
                                                data-name="Path 30752"
                                                transform="translate(2.447 0)"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    d="M 9.499995231628418 18.2755241394043 L 17.24255561828613 9.887763977050781 L 9.499995231628418 1.500003933906555 L 9.499995231628418 6.390714168548584 L 12.72606468200684 9.887763977050781 L 9.499995231628418 13.38481426239014 L 9.499995231628418 18.2755241394043 M 9.499653816223145 19.77558326721191 C 9.316328048706055 19.77558326721191 9.131294250488281 19.74194717407227 8.953784942626953 19.67254447937012 C 8.378564834594727 19.44763374328613 7.99999475479126 18.89314460754395 7.99999475479126 18.2755241394043 L 7.99999475479126 13.38481426239014 C 7.99999475479126 13.00788402557373 8.141904830932617 12.64477443695068 8.397475242614746 12.3677339553833 L 10.68527698516846 9.887763977050781 L 8.397475242614746 7.407793998718262 C 8.141904830932617 7.130753993988037 7.99999475479126 6.767643928527832 7.99999475479126 6.390714168548584 L 7.99999475479126 1.500003933906555 C 7.99999475479126 0.8823840022087097 8.378564834594727 0.3278939723968506 8.953784942626953 0.1029839739203453 C 9.131258964538574 0.03359496966004372 9.316363334655762 -5.543701263377443e-05 9.499653816223145 -5.543701263377443e-05 C 9.910433769226074 -5.543701263377443e-05 10.31252574920654 0.1687753796577454 10.60219478607178 0.4825839698314667 L 18.34475517272949 8.870344161987305 C 18.87515449523926 9.444933891296387 18.87515449523926 10.33059406280518 18.34475517272949 10.90518379211426 L 10.60219478607178 19.29294395446777 C 10.31255149841309 19.60672569274902 9.910395622253418 19.77558326721191 9.499653816223145 19.77558326721191 Z"
                                                    stroke="none"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                            <g
                                                id="Path_30753"
                                                data-name="Path 30753"
                                                transform="translate(1.389 1.685)"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    d="M 6.686956405639648 14.90506172180176 L 6.686956405639648 10.99697208404541 L 4.10905647277832 8.202531814575195 L 6.686956405639648 5.408092021942139 L 6.686956405639648 1.500001788139343 L 0.4999963045120239 8.202531814575195 L 6.686956405639648 14.90506172180176 M 6.687297821044922 16.40512084960938 C 6.276517391204834 16.40512084960938 5.874425888061523 16.23628997802734 5.584756374359131 15.92248153686523 L -0.6022037267684937 9.219951629638672 C -1.132603645324707 8.64536190032959 -1.132603645324707 7.759701728820801 -0.6022037267684937 7.185111999511719 L 5.584756374359131 0.4825818240642548 C 5.87440013885498 0.1688009202480316 6.276555061340332 -5.759948908234946e-05 6.687297821044922 -5.759948908234946e-05 C 6.870623588562012 -5.759948908234946e-05 7.055656909942627 0.03357908129692078 7.233166217803955 0.1029818132519722 C 7.808386325836182 0.3278918266296387 8.186956405639648 0.882381796836853 8.186956405639648 1.500001788139343 L 8.186956405639648 5.408092021942139 C 8.186956405639648 5.785021781921387 8.045045852661133 6.148131847381592 7.78947639465332 6.425171852111816 L 6.149843215942383 8.202531814575195 L 7.78947639465332 9.979891777038574 C 8.045045852661133 10.25693225860596 8.186956405639648 10.620041847229 8.186956405639648 10.99697208404541 L 8.186956405639648 14.90506172180176 C 8.186956405639648 15.52268218994141 7.808386325836182 16.07717132568359 7.233166217803955 16.30208206176758 C 7.055692195892334 16.3714714050293 6.870587825775146 16.40512084960938 6.687297821044922 16.40512084960938 Z"
                                                    stroke="none"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span className="capitalize">{t("trade")}</span>
                            </Link>
                        </li>
                        {/* <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%]">
                            <Link
                                href="/tournament"
                                className={clsx("flex flex-col items-center text-center no-hover", {
                                    "text-primary": pathname.startsWith("/tournament"),
                                })}
                            >
                                <span className="text-center mb-2">
                                    <svg
                                        fill="#ffffff"
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 256 256"
                                        id="Flat"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#ffffff"
                                        className={
                                            pathname.startsWith("/tournament") ? "fill-current" : "fill-light text-light"
                                        }
                                    >
                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path d="M97.85352,185.8335c-5.04,15.11914-17.16211,26.26318-35.05664,32.228a88.27924,88.27924,0,0,1-25.30665,4.44825,4.0002,4.0002,0,0,1-4-4,88.27688,88.27688,0,0,1,4.44825-25.30665C43.90332,175.30859,55.04785,163.186,70.167,158.14648a3.99987,3.99987,0,1,1,2.5293,7.58936c-24.91016,8.30371-29.93945,37.49268-30.95215,48.52,11.02344-1.01172,40.21582-6.04,48.51953-30.95215a4.00018,4.00018,0,0,1,7.58985,2.52979ZM198.71,108.20117l-10.1416,10.1416v62.91211a11.92374,11.92374,0,0,1-3.51367,8.48487L152.71191,222.082A11.99995,11.99995,0,0,1,132.46,215.9502l-8.14429-40.72315-43.54223-43.542L40.05078,123.54a11.99947,11.99947,0,0,1-6.13281-20.252l32.3418-32.3418a11.925,11.925,0,0,1,8.48535-3.51465h62.91162l10.14209-10.14258c27.30078-27.30078,55.10351-26.54,65.78906-24.94531a11.90048,11.90048,0,0,1,10.06836,10.06738C225.251,53.09766,226.01172,80.89941,198.71,108.20117ZM41.61914,115.69531l39.81152,7.9624,48.2262-48.22607H74.74512a3.97492,3.97492,0,0,0-2.8291,1.17188l-32.3418,32.3413a4.00043,4.00043,0,0,0,2.04492,6.75049Zm138.94922,10.64746-48.22669,48.227,7.962,39.811a4.00088,4.00088,0,0,0,6.75195,2.04394l32.3418-32.34179a3.97415,3.97415,0,0,0,1.1709-2.82813ZM193.05371,102.544c24.72852-24.729,24.10547-49.46436,22.69043-58.95118a3.946,3.946,0,0,0-3.33594-3.33691c-9.48925-1.415-34.22461-2.03809-58.95312,22.69043l-11.31262,11.3125-.00135.00146L88.40234,128,128,167.59814l53.73962-53.73974.00086-.001Z" />{" "}
                                        </g>
                                    </svg>
                                </span>
                                <span className="capitalize">{t("challenge")}</span>
                            </Link>
                        </li> */}
                        <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%]">
                            <Link
                                href="/affiliate/general"
                                className={clsx("flex flex-col items-center text-center no-hover", {
                                    "text-primary": pathname.startsWith("/affiliate"),
                                })}
                            >
                                <span className="text-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="21"
                                        height="23"
                                        viewBox="0 0 21 23"
                                        className={clsx({
                                            "fill-current": pathname.startsWith("/affiliate"),
                                            "fill-light text-light": !pathname.startsWith("/affiliate"),
                                        })}
                                    >
                                        <defs>
                                            <clipPath id="aff-clip-path">
                                                <rect width="21" height="23" fill="none"></rect>
                                            </clipPath>
                                        </defs>
                                        <g id="aff" clipPath="url(#aff-clip-path)">
                                            <g id="aff-2" data-name="aff" transform="translate(-0.1 0.5)">
                                                <line
                                                    id="Line_1252"
                                                    data-name="Line 1252"
                                                    y1="3.29"
                                                    x2="5.265"
                                                    transform="translate(7.968 5.855)"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="2"
                                                ></line>
                                                <line
                                                    id="Line_1253"
                                                    data-name="Line 1253"
                                                    x2="5.265"
                                                    y2="3.29"
                                                    transform="translate(7.968 12.855)"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="2"
                                                ></line>
                                                <circle
                                                    id="Ellipse_1366"
                                                    data-name="Ellipse 1366"
                                                    cx="3.5"
                                                    cy="3.5"
                                                    r="3.5"
                                                    transform="translate(13.1 0.5)"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    fill="none"
                                                ></circle>
                                                <circle
                                                    id="Ellipse_1367"
                                                    data-name="Ellipse 1367"
                                                    cx="3.5"
                                                    cy="3.5"
                                                    r="3.5"
                                                    transform="translate(13.1 14.5)"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    fill="none"
                                                ></circle>
                                                <circle
                                                    id="Ellipse_1368"
                                                    data-name="Ellipse 1368"
                                                    cx="3.5"
                                                    cy="3.5"
                                                    r="3.5"
                                                    transform="translate(1.1 7.5)"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    fill="none"
                                                ></circle>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span className="capitalize">{t("affiliate")}</span>
                            </Link>
                        </li>
                        <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%]">
                            <Link
                                href="/user/balance"
                                className={clsx("flex flex-col items-center text-center no-hover", {
                                    "text-primary":
                                        pathname.startsWith("/user/balance") ||
                                        pathname.startsWith("/user/binary-wallet"),
                                })}
                            >
                                <span className="text-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19.815"
                                        height="16.846"
                                        viewBox="0 0 19.815 16.846"
                                        className={
                                            pathname.startsWith("/user/balance") ||
                                            pathname.startsWith("/user/binary-wallet")
                                                ? "fill-current"
                                                : "fill-light text-light"
                                        }
                                    >
                                        <g id="_000000ff" data-name="#000000ff" transform="translate(-42.663 -106.619)">
                                            <path
                                                id="Path_30756"
                                                data-name="Path 30756"
                                                d="M45.072,106.675a3.344,3.344,0,0,1,.674-.054H58.933a5.487,5.487,0,0,1,1.171.061,2.972,2.972,0,0,1,2.374,2.926q0,5.458,0,10.916a2.985,2.985,0,0,1-2.939,2.94H46.391a5.837,5.837,0,0,1-1.532-.1,3,3,0,0,1-2.11-2.16,3.184,3.184,0,0,1-.085-.815q0-5.389,0-10.777a2.946,2.946,0,0,1,.652-1.866,2.985,2.985,0,0,1,1.756-1.066m-.426,2.89q0,5.454,0,10.908a1,1,0,0,0,1.007,1.008H59.49a1,1,0,0,0,1-.96c0-.671.008-1.343,0-2.014-1.494,0-2.988,0-4.482,0a3.467,3.467,0,0,1,.048-6.934H60.5q0-1,0-2.01a.99.99,0,0,0-.957-.961q-6.944,0-13.887,0a1,1,0,0,0-1,.963m9.934,5.193a1.5,1.5,0,0,0,.825,1.627,2.538,2.538,0,0,0,1.159.143c1.311,0,2.622,0,3.933,0,0-.99,0-1.98,0-2.97-1.5,0-2.994,0-4.491,0A1.492,1.492,0,0,0,54.58,114.758Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="capitalize">{t("wallet")}</span>
                            </Link>
                        </li>
                        <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%]">
                            <Link
                                href="/user/trade-history"
                                className={clsx("flex flex-col items-center text-center no-hover", {
                                    "text-primary": pathname.startsWith("/user/trade-history"),
                                })}
                            >
                                <span className="text-center mb-2">
                                    <svg
                                        id="speedometer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17.809"
                                        height="17.809"
                                        viewBox="0 0 17.809 17.809"
                                        className={
                                            pathname.startsWith("/user/trade-history")
                                                ? "fill-current"
                                                : "fill-light text-light"
                                        }
                                    >
                                        <path
                                            id="Path_30761"
                                            data-name="Path 30761"
                                            d="M9.995,9.995a2.226,2.226,0,0,0,0-3.149C9.125,5.978,1,1,1,1S5.978,9.125,6.846,9.995A2.226,2.226,0,0,0,9.995,9.995Z"
                                            transform="translate(0.484 0.484)"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            id="Path_30762"
                                            data-name="Path 30762"
                                            d="M8.9,0a1.484,1.484,0,1,0,0,2.968A5.936,5.936,0,1,1,2.968,8.9,1.484,1.484,0,1,0,0,8.9,8.9,8.9,0,1,0,8.9,0Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="capitalize">{t("dashboard")}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col">
                        <li className="hidden md:block btn-settings relative cursor-pointer py-3 after:w-[70%] after:content-[''] after:absolute after:top-0 after:left-[50%] after:h-[1px] after:-translate-x-[50%] after:bg-text">
                            <a
                                href="#"
                                onClick={handleSignOut}
                                className="flex flex-col items-center text-center hover:text-inherit"
                            >
                                <span className="text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        className="mr-2 iconLabel"
                                    >
                                        <g data-v-5058a5bc="" id="log-out" transform="translate(0 -1)">
                                            <path
                                                data-v-5058a5bc=""
                                                id="Path_29008"
                                                data-name="Path 29008"
                                                d="M6.5,5.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1h-7a1,1,0,0,1-1-1v-3"
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></path>
                                            <line
                                                data-v-5058a5bc=""
                                                id="Line_1254"
                                                data-name="Line 1254"
                                                x1="11"
                                                transform="translate(0.5 8.5)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></line>
                                            <path
                                                data-v-5058a5bc=""
                                                id="Path_29009"
                                                data-name="Path 29009"
                                                d="M3.5,5.5l-3,3,3,3"
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <span>{t("sign_out")}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
