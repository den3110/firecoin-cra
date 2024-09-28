"use client";

import { Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import imgIconDelete from "@/assets/images/icon-delete.svg";
import Loading from "@/components/Loading";
import { useEffect, useRef, useState } from "react";
import { CircleStencil, Cropper } from "react-advanced-cropper";
import useAuth from "@/hooks/useAuth";

import "react-advanced-cropper/dist/style.css";
import { debounce } from "lodash/function";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import { getCurrentHost } from "@/utils/clientInfo";

const ChangeAvatarModal = ({ open = true, onClose }) => {
    const t = useTranslations();

    const cropperRef = useRef(null);
    const inputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const [fileSize, setFileSize] = useState(0);

    const [auth, _] = useAuth();

    const updateUserInfo = useUpdateUserInfo();

    const { enqueueSnackbar } = useSnackbar();

    const handleCloseModal = () => {
        onClose?.();
    };

    const handleCloseModalBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (!auth?.user?.photo) {
            return;
        }

        setImage({
            src: `${getCurrentHost()}${auth?.user?.photo}`,
            type: "image/jpeg",
        });
    }, [auth?.user?.photo]);

    const handleLoadImage = (event) => {
        const { files } = event.target;

        if (files && files[0]) {
            const blob = URL.createObjectURL(files[0]);

            setImage({
                src: blob,
                type: files[0].type,
            });
        }

        event.target.value = "";
    };

    const handleUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChange = debounce((data) => {
        const canvas = cropperRef.current?.getCanvas();

        if (!canvas) {
            return;
        }

        canvas.toBlob((blob) => {
            // set file size
            setFileSize(blob.size);
        }, "image/jpeg");
    }, 1000);

    const handleSubmit = () => {
        setLoading(true);

        const canvas = cropperRef.current?.getCanvas();

        if (!canvas) {
            return;
        }

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append("Photo", blob);

            HttpClient.instanceClient()
                .post("/api/auth/me/photo", formData)
                .then((res) => res.data)
                .then((data) => {
                    if (!data.ok) {
                        return;
                    }

                    enqueueSnackbar(t("successfully_uploaded"), { variant: "success" });
                    updateUserInfo().then();

                    handleCloseModal();
                })
                .finally(() => {
                    setLoading(false);
                });
        }, "image/jpeg");
    };


    useEffect(() => {
        // add .no-scrollclass to body
        if (open) {
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, [open]);

    return (
        <Transition show={open}>
            <Transition.Child
                enter="transition-opacity"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="modal z-[9999] lg:z-[99] fixed top-0 left-0 w-full h-full outline-0 bg-custom-border lg:bg-black/50"></div>
            </Transition.Child>
            <Transition.Child
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="pr-[15px] block fixed top-0 left-0 z-[9999] w-full h-full overflow-hidden outline-0"
                    onClick={handleCloseModalBackdrop}
                >
                    <div className="m-0 lg:mt-7 lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 text-light w-full lg:min-w-[500px] min-[576px]:max-w-[500px] absolute pointer-events-auto lg:p-5">
                        <div className="min-[600px]:pb-4 lg:rounded-[10px] bg-secondarySidebar relative flex flex-col h-dvh lg:h-auto w-full pointer-events-auto outline-0 border border-secondary-600 px-4 py-5 lg:p-0">
                            <div className="modal-header flex justify-between items-center px-[35px] py-[19px]">
                                <h3 className="text-[26px] font-bold text-light mb-0">{t("upload_image")}</h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="relative border-transparent w-[37px] -right-[15px] h-[37px] rounded-full bg-text p-0 cursor-pointer"
                                >
                                    <img src={imgIconDelete} alt="icon-delete" className="w-[37px] h-[37px]" />
                                </button>
                            </div>
                            <Loading loading={loading} className="modal-content pt-5 pb-[30px] px-[30px]">
                                <div>
                                    {image && image.src ? (
                                        <Cropper
                                            ref={cropperRef}
                                            src={image && image.src}
                                            className="h-[230px] border border-transparent bg-transparent rounded-[10px]"
                                            stencilComponent={CircleStencil}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div
                                            className="bg-secondary py-[45px] text-secondary-600 rounded-[10px] h-[230px] mb-[23px] w-full cursor-pointer text-center"
                                            onClick={handleUpload}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="89.156"
                                                height="95.1"
                                                viewBox="0 0 89.156 95.1"
                                                className="inline-block"
                                            >
                                                <g id="upload-and-send" transform="translate(0 0)" opacity="0.3">
                                                    <path
                                                        id="Path_34910"
                                                        data-name="Path 34910"
                                                        d="M25.038,1.016a2.972,2.972,0,0,1,4.476,0l20.8,23.775a2.972,2.972,0,0,1-2.241,4.927H36.188V68.353a2.972,2.972,0,0,1-2.972,2.972H21.329a2.972,2.972,0,0,1-2.972-2.972V29.719H6.469a2.972,2.972,0,0,1-2.235-4.927Z"
                                                        transform="translate(17.306 0)"
                                                        fill="#fefefe"
                                                    ></path>
                                                    <path
                                                        id="Path_34911"
                                                        data-name="Path 34911"
                                                        d="M77.269,11V28.831H11.888V11H0V34.775a5.944,5.944,0,0,0,5.944,5.944H83.213a5.944,5.944,0,0,0,5.944-5.944V11Z"
                                                        transform="translate(0 54.381)"
                                                        fill="#fefefe"
                                                    ></path>
                                                </g>
                                            </svg>
                                            <p className="text-xl font-bold mt-5 text-text">
                                                {t("click_here_to_upload_your_image")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLoadImage}
                                    className="hidden"
                                />
                                {image && image.src && (
                                    <div className="my-2.5 flex justify-end">
                                        <button
                                            className="text-sm bg-transparent border-transparent shadow-none text-primary font-normal"
                                            onClick={handleUpload}
                                        >
                                            <svg
                                                id="chat-image"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                className="mr-2 inline"
                                            >
                                                <path
                                                    id="Path_34909"
                                                    data-name="Path 34909"
                                                    d="M14,0H2A2,2,0,0,0,0,2v9a2,2,0,0,0,2,2H3v2.5a.5.5,0,0,0,.82.384L7.281,13H14a2,2,0,0,0,2-2V2A2,2,0,0,0,14,0Zm-.074,9.763A.5.5,0,0,1,13.5,10H2.5a.5.5,0,0,1-.429-.757l3-5a.52.52,0,0,1,.857,0l1.44,2.4L9.553,2.276a.521.521,0,0,1,.9,0l3.5,7a.5.5,0,0,1-.022.487Z"
                                                    fill="#1fb6fd"
                                                ></path>
                                            </svg>
                                            {t("change_image")}
                                        </button>
                                    </div>
                                )}

                                <div className="text-center mb-5">
                                    <p className="text-sm text-text mb-4">
                                        <span className="text-light">{t("file_size")}: </span>
                                        <span className="text-lg text-success-50">
                                            <b>{Math.round((fileSize / 1024 / 1024) * 100) / 100}MB</b>
                                        </span>
                                    </p>
                                    <p className="text-text mb-4">{t("uploaded_images_must_be_below")} 5MB*</p>
                                    <p className="text-text mb-4">
                                        {t("note_please_zoom_or_adjust_image_to_decrease_image_size")}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center mt-5">
                                    <button
                                        className="text-center cursor-pointer px-[85px] py-[15px] rounded-[3px] text-light bg-gradient-primary border-none text-base font-bold inline-flex items-center justify-center"
                                        onClick={handleSubmit}
                                    >
                                        {t("update")}
                                    </button>
                                </div>
                            </Loading>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default ChangeAvatarModal;
