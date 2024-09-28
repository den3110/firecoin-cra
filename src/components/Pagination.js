import paginate from "@/utils/paginate";
import clsx from "clsx";
import { useMemo } from "react";

const Pagination = ({ page, total, size, onChange }) => {
    const handlePage = (page) => {
        return (e) => {
            e.preventDefault();
            onChange(page);
        };
    };

    const lastPage = Math.ceil(total / size);

    const items = useMemo(() => {
        if (!page || !lastPage) return [];

        return paginate({ current: page, max: lastPage }).items;
    }, [page, lastPage]);

    if (lastPage <= 1) return null;

    return (
        <div className="pagination leading-[20px] flex justify-center py-[15px]">
            <ul className="h-[30px] flex items-center">
                {page > 1 && (
                    <li key="prev" className="btn-prev">
                        <a href="#" onClick={handlePage(page - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.68 8.109" style={{ width: 7 }}>
                                <path
                                    id="Path_24"
                                    data-name="Path 24"
                                    d="M16.43,16.859,13,13.43,16.43,10"
                                    transform="translate(-12.375 -9.375)"
                                    stroke="currentColor"
                                ></path>
                            </svg>
                        </a>
                    </li>
                )}
                {items.map((item) => {
                    return (
                        <li key={item} className={clsx("btn-page", { "current-page": item === page })}>
                            <a href="#" onClick={handlePage(item)}>
                                {item}
                            </a>
                        </li>
                    );
                })}
                {page < lastPage && (
                    <li className="btn-next">
                        <a href="#" onClick={handlePage(page + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.68 8.109" style={{ width: 7 }}>
                                <g id="small-left" transform="translate(17.055 17.484) rotate(180)">
                                    <path
                                        id="Path_24"
                                        data-name="Path 24"
                                        d="M16.43,16.859,13,13.43,16.43,10"
                                        transform="translate(0 0)"
                                        stroke="currentColor"
                                    ></path>
                                </g>
                            </svg>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
