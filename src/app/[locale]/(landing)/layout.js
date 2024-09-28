import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import clsx from "clsx";
import Footer from "./Footer";
// import PanelHeader from "@/components/PanelHeader"; // Điều chỉnh đường dẫn
import HeaderLanding from "./_partials/HeaderLanding";
import PanelHeader from "../(panel)/_partials/PanelHeader";

const pageWithFooter = ["/", "/login", "/register", "/faqs"];

const LandingLayout = ({ children, drawer }) => {
  const { t } = useTranslation(); // Thay thế useTranslations
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate(); // Thay thế useRouter
  const location = useLocation(); // Thay thế usePathname

  useEffect(() => {
    const token = localStorage.getItem("USER_TOKEN");

    if (location.pathname.indexOf("/faqs") > -1 && token) {
      return;
    }
    if (token) {
      navigate("/index");
      return;
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("USER_TOKEN");

    if (location.pathname.indexOf("/faqs") > -1 && token) {
      return;
    }

    if (token) {
      navigate("/index");
      return;
    }

    setAuth({
      initialized: true,
    });
  }, [navigate, setAuth]);

  const isDynamicPage = useMemo(() => {
    return (
      location.pathname === "/" ||
      [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-account",
      ].includes(location.pathname)
    );
  }, [location.pathname]);

  const shouldShowFooter = useMemo(() => {
    return (
      pageWithFooter.includes(location.pathname) ||
      location.pathname.startsWith("/faqs")
    );
  }, [location.pathname]);

  useEffect(() => {
    if (!isDynamicPage) {
      document.body.classList.add("scrolled");
      return () => {
        document.body.classList.remove("scrolled");
      };
    }

    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 0) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  if (!auth.initialized) {
    return null;
  }

  return (
    <div
      className={clsx("wrapper min-h-dvh landing-layout", {
        "bg-[url('http://localhost:3001/assets2/images/BackgroundFAQs.jpg')] bg-no-repeat bg-fixed bg-cover":
          location.pathname.startsWith("/faqs"),
      })}
    >
      {!isDynamicPage && <div className="h-[56px] lg:h-[65px] w-full"></div>}
      {auth?.user ? <PanelHeader /> : <HeaderLanding />}
      <main>{children}</main>
      <Footer shouldShowFooter={shouldShowFooter} />
      {drawer}
    </div>
  );
};

export default LandingLayout;
