import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export const useMobile = () => {
    const isMobileQuery = useMediaQuery({ maxWidth: 767 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileQuery);
    }, [isMobileQuery]);

    return isMobile;
};

export const useSmallMobile = () => {
    const isSmallMobileQuery = useMediaQuery({ maxWidth: 576 });
    const [isSmallMobile, setIsSmallMobile] = useState(false);

    useEffect(() => {
        setIsSmallMobile(isSmallMobileQuery);
    }, [isSmallMobileQuery]);

    return isSmallMobile;
};

export const useIsNotSmallMobile = () => {
    const isNotSmallMobileQuery = useMediaQuery({ minWidth: 577 });
    const [isNotSmallMobile, setIsNotSmallMobile] = useState(true);

    useEffect(() => {
        setIsNotSmallMobile(isNotSmallMobileQuery);
    }, [isNotSmallMobileQuery]);

    return isNotSmallMobile;
}

export const useTablet = () => {
    const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        setIsTablet(isTabletQuery);
    }, [isTabletQuery]);

    return isTablet;
};

export const useDesktop = () => {
    const isDesktopQuery = useMediaQuery({ minWidth: 1024 });
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(isDesktopQuery);
    }, [isDesktopQuery]);

    return isDesktop;
};

export const useIsNotDesktop = () => {
    const isNotDesktopQuery = useMediaQuery({ maxWidth: 1023 });
    const [isNotDesktop, setIsNotDesktop] = useState(true);

    useEffect(() => {
        setIsNotDesktop(isNotDesktopQuery);
    }, [isNotDesktopQuery]);

    return isNotDesktop;
};
