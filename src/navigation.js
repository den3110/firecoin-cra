import React from 'react';
import { useLocation, useNavigate, NavLink as LinkRoot } from 'react-router-dom';

export const locales = ["cm", "cn", "en", "id", "jp", "kr", "la", "th", "vi"];

// Tạo Link component
export const Link = ({ href, children, ...props }) => {
    return (
        <LinkRoot to={href} {...props}>
            {children}
        </LinkRoot>
    );
};

// Hook để lấy pathname
export const usePathname = () => {
    const location = useLocation();
    return location.pathname;
};

// Hook để sử dụng router
export const useRouter = () => {
    const navigate = useNavigate();

    const push = (path) => {
        navigate(path);
    };

    const replace = (path) => {
        navigate(path, { replace: true });
    };

    return {
        push,
        replace,
    };
};

// Hàm redirect
export const redirect = (path) => {
    window.location.href = path; // Hoặc sử dụng navigate
};
