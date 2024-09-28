import { Menu } from "@headlessui/react";

const GeneralTooltip = ({ children, content, style="absolute bottom-full left-1/2 w-[276px] -translate-x-1/2 mb-2.5" }) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button as="div">{children}</Menu.Button>
            <Menu.Items>                
                <div className={style}>
                    <div className="bg-light rounded-[16px] text-black p-4 leading-[21px]">{content}</div>
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default GeneralTooltip;
