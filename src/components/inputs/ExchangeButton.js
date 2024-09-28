import { useDispatch } from "react-redux";
import { setShowExchange } from "@/store/balanceReducer";

const ExchangeButton = ({ className, ...props }) => {
    const dispatch = useDispatch();

    const handleShowExchange = () => {
        dispatch(setShowExchange(true));
        props.closeMenu();
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="29"
            viewBox="0 0 46 29"
            className={`fill-light cursor-pointer ${className}`}
            onClick={handleShowExchange}
            {...props}
        >
            <g id="Group_13378" data-name="Group 13378" transform="translate(-230 -71)">
                <g id="Group_13375" data-name="Group 13375">
                    <g id="Group_13376" data-name="Group 13376">
                        <rect
                            id="Rectangle_4298"
                            data-name="Rectangle 4298"
                            width="46"
                            height="29"
                            rx="4"
                            transform="translate(230 71)"
                            className="fill-primary"
                        ></rect>
                    </g>
                </g>
                <g id="Group_13377" data-name="Group 13377">
                    <g id="conversion" transform="translate(246.725 78.133)">
                        <path
                            id="Path_13963"
                            data-name="Path 13963"
                            d="M15.692,7.459H1V6.123H14.079L10.072,2.116l.945-.944,5.147,5.147a.668.668,0,0,1-.472,1.14Z"
                            transform="translate(-1 -1.172)"
                            stroke="#fff"
                            className="fill-color"
                        ></path>
                        <path
                            id="Path_13964"
                            data-name="Path 13964"
                            d="M6.342,34.287,1.2,29.14A.668.668,0,0,1,1.668,28H16.359v1.336H3.28l4.007,4.007Z"
                            transform="translate(-1 -19.042)"
                            stroke="#fff"
                            className="fill-color"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default ExchangeButton;
