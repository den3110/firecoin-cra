
import img404 from "@/assets/images/404.png";
import { Link } from "@/navigation";

const NotFoundPage = () => {

    return (
        <div className="w-full p-5 min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-65px)] bg-light">
            <div className="bs-container">
                <div className="text-center">
                    <img src={img404} alt="404 img" className="my-6 inline-block" />
                </div>
                <div className="text-center">
                    <p className="mb-6 text-[48px] font-bold leading-[64px]">
                        A little lost?
                        <br />
                        Let's try again.
                    </p>
                    <p className="mb-0">
                        <Link
                            href="/"
                            className="rounded-[7px] inline-block overflow-hidden leading-[44px] w-[264px] px-5 py-2.5 text-lg text-light bg-gradient-primary border-none cursor-pointer relative font-bold items-center text-center"
                        >
                            Back to home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
