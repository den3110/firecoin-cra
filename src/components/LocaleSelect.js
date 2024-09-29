import { Menu, Transition } from "@headlessui/react";
import viImg from "@/assets/images/lang/vi.png";
import enImg from "@/assets/images/lang/en.png";
import krImg from "@/assets/images/lang/kr.png";

import { useMemo, useRef } from "react";
import { usePathname, useRouter } from "@/navigation";
import clsx from "clsx";
import useLocale from "@/hooks/useLocales";
import { useTranslation } from "react-i18next";

export const localeList = [
    {
        locale: "en",
        name: "English",
        icon: "data:image/png;base64,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",
    },
    {
        locale: "vi",
        name: "Tiếng Việt",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAAAXNSR0IArs4c6QAAAdhJREFUWAntmMsuxFAYx/+nV1MxmUywIWLjEgm7YWUvNnY2EqMLsfUInsHWwoZnsLLzAjYIIqYxIRHXjtBpe+qcGUQTjeqpaKTfprfv8vv+PZem5HB0aIlA2kQGLQA1ydHoSJBBtjZSENxLmYXjYISUsg3IGHNA0SGUK5gpBY0pGfpwui8l1Wxls4DycoeoaKH41ADVQQmd0yqKMxqUXhIqInKRGmD3yptyEkHZTE9FJUl3xTkNWn+4t+Ks9pGqNK+DNsI7qHPmw95xP3ziniTai9U+goHtLig9cqw6bp2itvAI/zoMHSc4LEOcCObj1gNY1QboPf02wrv0YS0mg+PJEwHyQLdGYZk2qB0N6d8yn6oN7+rnyvEa3BID8mDnmOJuy+GnX9rNxnNL7S8fxrwpBMhrdExEj8PCeKI5GEIXA2RsRkUNJfx8YVT+GLAwoYBo7UX5Zd+FtWTjYsWGc+K1OGU2yzW2gIuYUIvGpILmqYfr9Wc0dttQHOZp7xFdbF3sWTWYwsznvJmYMdE6+F5NH5PhHDKwIGJrY+3rQxLziZ7p77mijkIKOgc+yxsBxysydhE4nkJsgPAMv2w5oKjAuYL/WkH2iVGT+A8aBMGDaKepx7eY6Nor+sqCnmPgaisAAAAASUVORK5CYII=",
    },
    {
        locale: "jp",
        name: "日本",
        icon: "data:image/png;base64,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",
    },
    {
        locale: "kr",
        name: "한국어",
        icon: krImg,
    },
    {
        locale: "cn",
        name: "中国",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKJQTFRF3ikQ3ioQ4DMP3isQ8pcG8Y4H3y8P6F8M3zEP8pYG8pgG4DYP4TkP/MwC4TcP6GAL/94A6moK74gI74YI5EkN9q4E+sID/M4B/NAB968E5UwN4DQP3y8Q4kAO+sAD+LcE4j4O5lYM/9wA51gM9KAG+8sC63AK+8kC8I4H5EoN40MO3ywQ40QO8I0H9aQF3zAP3y0Q5lQN5VEN+b0D9qsF6GIL9jwvAAAAAKFJREFUeJxjYCAdMDIyEVLCDCFZWNkIKGQHkxycXNz41fHw8kHs5mZgYsTtMmZmfgFBZmawCmYhYZwKRUTFxAUkxCSlQBxpVmEZnCpl5QQEBOQVIBw+fE5UVBIQUManAAZUVNXUNaBsTS1tnOq0uXQYFHQhbCY9PX2cCplBwW0Ac4YhEU4w0DEixqVAYGyC19NwIKNsSqSJDLjjbxSMAkoAAM6jB660TI8sAAAAAElFTkSuQmCC",
    },
    {
        locale: "cm",
        name: "ប្រទេសកម្ពុជា",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAHgAAAAB3TwmwAAABOUlEQVRYCWPkMJqb8J+BsZ+RkUGAYRCB//8ZPjAy/C9kZDea936wOQ4WTiBHMg1Wx4EcCXIbE8y1g5UedSClMTPoQ5DxLrfuf0p9SUv9gz4EqepA3mh/BtEZzVQNUBZqmQZ23EyE415n1FLFaJJCEF8IiSI5jjfGH6vj8OnHqgEoSHQIUhpC5OonOhcrfbmE4sl7PHoofErlUQxD4pAUxUj66MYcdSClQU1UJuGwNcGwBz3NoSsgJA8y88fhM+jaMPhERbFQVRaGRkoFhCoziTKCoANBPsUWgkSZjkcRh50pUeYychjPw9tY2DXTk8HWWAKPVeRLHTrzgsE9YzteAwg6EK9uOkgSjGI6uAGvFaMOxBs8REiOhiARgYRXyeAPwf8M/z/i9cIASoLcxsT4n6FgMDoS5CaQ2wCkDU+xLHuv8gAAAABJRU5ErkJggg==",
    },
    {
        locale: "th",
        name: "Thai",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAADCgAwAEAAAAAQAAACQAAAAAbZ9/dAAAANVJREFUWEftmC0SwjAQRr+ETklNq5AIBDgM1+EIGBxnqOsgOQiC+1BRh2Bo+pNlUipxMZ/Ic0nMm8nuZrOqvT/kdb4AtoPSGgyIc8AyRVGVUM32INJ+oJJkPuZAhgEqy6Cls3RyHu8k1kKzXOs/vJtqzErmNSXq6UZuwbquqQV5A3CGXlCJe3PH4CI/cguud6eYJCFEwVCiYChRMBT+Qk3/1MV2KxD+JKFv+ek/Tc1mz50kIrx+fgSi0feQcZy3eJhGH8sUurhdAWN+AxsSJpfMIK9KfAEzc1IDpT78RgAAAABJRU5ErkJggg==",
    },
    {
        locale: "id",
        name: "Indonesian",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAADCgAwAEAAAAAQAAACQAAAAAbZ9/dAAAALBJREFUWEft17ENAjEMhWHbOoGuckNHxQhsxQQMwQTsQccENMxAF4mG9nToiJGj0NG5eYX/ylKaT4qiyPy6XO1xOFKd38QihJDVSrJe0e58Ir5v91aniXgY+jFGtiwk40hS5xkO57nJbYJyrf9yG66ul8BoCYyWwGgJjAYP5BttrM+Q8dM+2MBSCjQwH0m0BEZLYLQERktgNDHD/encJszcBrQazhd3VW0DEvKHU1X6ApckNnNwql6RAAAAAElFTkSuQmCC",
    },
    {
        locale: "la",
        name: "Lao",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABuklEQVRoQ2NkGOKAcYi7n2HUAwMdg6MxMOAxcFZMJ/A/w/8WBgZGrYF2DGn2/7/2/9//SsYzYtr3GRgYFUjTPDhU/2dguMd4Rkzn/+BwDnmuGPUAeeFGPV2jMUC9sCTPpNEYIC/cqKdr6McAs1ba0K4HRj2AJTnHBVgyxPlbMhhoyIJlL9x4zLBww3GGxRuPUy/xQ01ipGYM8PNyMqydlMngYKaO1aEHTt1kCM6bzvDx83eqeYSqHti7oJjB3lQNr+NAnnBJ7Bt8HgAlm3mtCUQ5LKl6AcOiDdRJTlSLAWJCH+a7g6dvMTgn9BLlWUKKqOaBtycmMIDyADHgw6dvDCKWhcQoJahmQDwAysTCFgUEHUeMAqp5YMgnoSGfiUHRTUwsUDMDg+ykWhICGQbKxOsmZ+GsC0COD8qdNngrMlimAyWn+AArtKbEMaqV/ciZm6oxQEypQW01Q98Do+NC1E4TJJo39LuUo0mIxCintvLRJETtECXVvKEfA6dFdR4zMjLIkOrzwaAePMEBnmL6z9DGwMigMRgcRbwb/l9j/MdQMTpLSXyI0UblaAzQJlyJN3U0BogPK9qoBAB7taalmsAf3gAAAABJRU5ErkJggg==",
    },
];

const LocaleSelect = ({ inSetting = false }) => {
    // const pathname = usePathname();
    // const router = useRouter();

    const { changeLanguage, locale } = useLocale();
    const { i18n } = useTranslation();

    const selectedLocale = useMemo(() => {
        return localeList.find((item) => item.locale === locale);
    }, [locale]);

    const handleSelectLocale = (newLocale) => {
        return (e) => {
            e.preventDefault();
            changeLanguage(newLocale);
            i18n.changeLanguage(newLocale)
            closeMenu();
            //router.replace(pathname, { locale: newLocale });
        };
    };
    const menuButtonRef = useRef();

    const closeMenu = () => {
        menuButtonRef.current?.click();
    };
    return (
        <div className="dropdown relative z-[2000]">
            <Menu>
                <Menu.Button
                    ref={menuButtonRef}
                    className={clsx(
                        "dropdown-toggle flex items-center gap-x-2 font-normal min-w-[160px] min-h-[45px] px-3 py-[0.375rem]",
                        {
                            "rounded-[0.125rem] bg-secondary-400 text-light text-sm": inSetting,
                            "rounded-sm bg-secondary-600": !inSetting,
                        },
                    )}
                >
                    <img
                        src={selectedLocale.icon}
                        alt={selectedLocale.name}
                        width={inSetting ? 24 : 18}
                        height={18}
                    />
                    <span className="flex-1 text-left">{selectedLocale.name}</span>
                </Menu.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                >
                    <Menu.Items>
                        <div
                            className={clsx("absolute rounded-sm border border-light-50/10 z-[2000]", {
                                "bottom-[46px] bg-secondary-600": !inSetting,
                                "bg-secondary-400 translate-y-1 text-sm text-light": inSetting,
                            })}
                        >
                            {localeList.map((locale) => (
                                <Menu.Item key={locale.locale}>
                                    <a
                                        href="#"
                                        className="dropdown-item flex items-center gap-x-2 border-t border-t-light-50/10 min-w-[160px] min-h-[45px] px-3 py-[0.375rem]"
                                        onClick={handleSelectLocale(locale.locale)}
                                    >
                                        <img
                                            src={locale.icon}
                                            alt={locale.name}
                                            width={inSetting ? 24 : 18}
                                            height={18}
                                        />
                                        <span className="flex-1 text-left">{locale.name}</span>
                                    </a>
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default LocaleSelect;
