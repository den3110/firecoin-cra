import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/navigation";
import CloseIcon from "@/components/CloseIcon";
import { getCurrentLogoSmSvg } from "@/utils/clientInfo";

const LandingDrawer = ({ children }) => {
    const pathname = usePathname();

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(pathname !== "/" && !pathname.startsWith("/faqs"));
    }, [pathname]);

    useEffect(() => {
        if (visible) {
            // add class "no-scroll" to body
            document.body.classList.add("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [visible]);

    return (
        <Transition show={visible} appear={true}>
            {/*darken overlay*/}
            <Transition.Child
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed top-0 left-0 w-screen h-dvh bg-black/70 z-[3000]"
            ></Transition.Child>
            <Transition.Child
                as="div"
                enter="transition ease-in-out duration-300"
                enterFrom="transform translate-x-full"
                enterTo="transform translate-x-0"
                leave="transition ease-in-out duration-300"
                leaveFrom="transform translate-x-0"
                leaveTo="transform translate-x-full"
                className="fixed top-0 left-0 w-screen h-dvh z-[3000]"
            >
                <div className="relative ml-auto max-w-[467px] bg-secondary h-full p-8 overflow-y-auto flex flex-col justify-between text-light">
                    <div className="drawer-header">
                        <div className="flex-1">
                            <img src={getCurrentLogoSmSvg()} alt="logo" height={34.24} width={130} />
                        </div>
                        <Link href="/" className="block absolute top-[24px] right-[30px]">
                            <CloseIcon />
                        </Link>
                    </div>
                    {children}
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default LandingDrawer;
