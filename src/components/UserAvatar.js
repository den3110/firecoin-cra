import clsx from "clsx";

const UserAvatar = ({ url }) => {
    return (
        <div
            style={{
                backgroundImage: `url('${url}')`,
            }}
            className={clsx(
                "bg-no-repeat bg-[50%] bg-[length:100%_100%] rounded-full w-[100px] h-[100px] mx-auto cursor-auto",
                {
                    "bg-[url('~/public/assets/images/avatar-default.svg')]": !url,
                },
            )}
        ></div>
    );
};

export default UserAvatar;
