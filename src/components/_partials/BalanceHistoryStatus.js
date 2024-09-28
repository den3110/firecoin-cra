"use client";

const SucceedStatus = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.997 16.329" className="w-[14px] fill-up align-middle">
        <g id="event-confirm" transform="translate(-36.666 -72.999)">
            <g id="Group_160" data-name="Group 160" transform="translate(32 66)">
                <path
                    id="Path_74"
                    data-name="Path 74"
                    d="M38.664,50.328Z"
                    transform="translate(-27 -27)"
                    className="check"
                ></path>
                <path
                    id="Path_75"
                    data-name="Path 75"
                    d="M44.655,33.342a1.166,1.166,0,0,1,0,1.649L36.49,43.156a1.166,1.166,0,0,1-1.649,0l-3.5-3.5a1.166,1.166,0,1,1,1.649-1.649l2.674,2.675,7.34-7.34A1.166,1.166,0,0,1,44.655,33.342Z"
                    transform="translate(-26.334 -26.002)"
                    className="check"
                ></path>
            </g>
        </g>
    </svg>
);

const PendingStatus = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12.604 2.909"
        className="w-[14px] fill-secondary-400 align-middle"
    >
        <g id="Group_164" transform="translate(-1095.183 -709.031)" data-name="Group 164">
            <circle
                id="Ellipse_67"
                data-name="Ellipse 67"
                cx="1.454"
                cy="1.454"
                r="1.454"
                transform="translate(1095.183 709.03)"
                className="cls-2"
            ></circle>
            <circle
                id="Ellipse_68"
                data-name="Ellipse 68"
                cx="1.454"
                cy="1.454"
                r="1.454"
                transform="translate(1100.03 709.03)"
                className="cls-2"
            ></circle>
            <circle
                id="Ellipse_69"
                data-name="Ellipse 69"
                cx="1.454"
                cy="1.454"
                r="1.454"
                transform="translate(1104.878 709.03)"
                className="cls-2"
            ></circle>
        </g>
    </svg>
);

const ProcessingStatus = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="w-[14px] fill-primary align-middle">
        <g id="settings-gear-64" transform="translate(0)">
            <g id="Group_1728" data-name="Group 1728">
                <path
                    id="Path_11077"
                    data-name="Path 11077"
                    d="M11.637,4.55,12.6,2.712,11.375,1.487,9.538,2.45a3.135,3.135,0,0,0-.963-.35L7.875,0H6.125l-.7,2.013a3.657,3.657,0,0,0-.875.35L2.712,1.4,1.4,2.712,2.362,4.55a3.657,3.657,0,0,0-.35.875L0,6.125v1.75l2.013.7c.087.35.262.613.35.963L1.4,11.375,2.625,12.6l1.838-.963a3.134,3.134,0,0,0,.962.35L6.125,14h1.75l.7-2.012c.35-.088.613-.263.963-.35l1.837.963L12.6,11.375l-.963-1.837a3.134,3.134,0,0,0,.35-.963L14,7.875V6.125l-2.012-.7A3.657,3.657,0,0,0,11.637,4.55ZM7,9.625A2.578,2.578,0,0,1,4.375,7,2.578,2.578,0,0,1,7,4.375,2.578,2.578,0,0,1,9.625,7,2.578,2.578,0,0,1,7,9.625Z"
                    className=""
                ></path>
            </g>
        </g>
    </svg>
);

const FailedStatus = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="w-[14px] fill-danger align-middle">
        <g id="m-delete" transform="translate(-33.998 -33.999)">
            <g id="Group_161" data-name="Group 161" transform="translate(33.998 33.998)">
                <path
                    id="Path_80"
                    data-name="Path 80"
                    d="M46.487,44.013a1.75,1.75,0,1,1-2.475,2.475L40,42.475l-4.013,4.013a1.75,1.75,0,1,1-2.475-2.475L37.525,40l-4.013-4.013a1.75,1.75,0,1,1,2.475-2.475L40,37.526l4.013-4.013a1.75,1.75,0,1,1,2.475,2.475L42.475,40Z"
                    transform="translate(-33 -33)"
                ></path>
            </g>
        </g>
    </svg>
);

const AcceptStatus = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 13.997 16.329"
        className="w-[14px] align-middle fill-success-50"
    >
        <g id="event-confirm" transform="translate(-36.666 -72.999)">
            <g id="Group_160" data-name="Group 160" transform="translate(32 66)">
                <path id="Path_74" data-name="Path 74" d="M38.664,50.328Z" transform="translate(-27 -27)"></path>
                <path
                    id="Path_75"
                    data-name="Path 75"
                    d="M44.655,33.342a1.166,1.166,0,0,1,0,1.649L36.49,43.156a1.166,1.166,0,0,1-1.649,0l-3.5-3.5a1.166,1.166,0,1,1,1.649-1.649l2.674,2.675,7.34-7.34A1.166,1.166,0,0,1,44.655,33.342Z"
                    transform="translate(-26.334 -26.002)"
                ></path>
            </g>
        </g>
    </svg>
);

const BalanceHistoryStatus = ({ status }) => {
    if (status === "Succeed") {
        return SucceedStatus;
    }

    if (status === "Pending") {
        return PendingStatus;
    }

    if (status === "Processing") {
        return ProcessingStatus;
    }

    if (status === "Failed") {
        return FailedStatus;
    }

    if (status === "Accept") {
        return AcceptStatus;
    }

    return null;
};

export default BalanceHistoryStatus;
