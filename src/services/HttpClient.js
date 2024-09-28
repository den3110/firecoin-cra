"use client";

import useAuth from "@/hooks/useAuth";
import { getCurrentHost } from "@/utils/clientInfo";
import axios from "axios";


export default class HttpClient {
    static _instance = null;

    /**
     * @type AxiosInstance
     * @type {null}
     * @private
     */
    _client = null;

    static instance() {
        if (this._instance === null) {
            this._instance = new HttpClient(getCurrentHost());
        }

        return this._instance;
    }

    static instanceClient() {
        return this.instance().client();
    }

    _logoutUser() {
        localStorage.removeItem("USER_TOKEN");
        window.location.href = "/";       
    }

      /**
     * Refresh the authentication token.
     */
      _refreshToken() {
        const token = localStorage.getItem("USER_TOKEN");
        if (!token) {
            this._logoutUser();
            return Promise.reject("No token found");
        }
    
        return this._client
            .post("/api/auth/auth/token", {
                refresh_token: JSON.parse(token).refresh_token,
                grant_type: 'refresh_token'
            })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.d;
                    localStorage.setItem("USER_TOKEN", JSON.stringify(data));
                    this._client.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                    return data.access_token;
                }
    
                this._logoutUser();
                return Promise.reject("Failed to refresh token");
            })
            .catch((error) => {
                this._logoutUser();
                return Promise.reject(error);
            });
    }
    

    constructor(baseUrl) {
        this._client = axios.create({
            baseURL: baseUrl,
            // withCredentials: true,
        });

        this._client.interceptors.request.use((config) => {
            // token from localStorage
            const token = localStorage.getItem("USER_TOKEN"); 
            if (!token) {
                return config;
            }

            config.headers.Authorization = `Bearer ${JSON.parse(token).access_token}`;
            return config;
        });

        // 401
        this._client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // Kiểm tra lỗi 401 và thử refresh token
                if (error.response && error.response.status === 401) {
                    const originalRequest = error.config;
                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        return this._refreshToken().then((newToken) => {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this._client(originalRequest);
                        });
                    }
                }
                return Promise.reject(error);
            },
        );

        // this._client.interceptors.response.use(
        //     (response) => {
        //         return response;
        //     },
        //     (error) => {
        //         if (error.response.status === 401) {
        //             router
        //
        //             // token from localStorage
        //             // const token = localStorage.getItem("USER_TOKEN");
        //             // if (!token) {
        //             //     return Promise.reject(error);
        //             // }
        //             //
        //             // const originalRequest = error.config;
        //             // if (originalRequest._retry) {
        //             //     return Promise.reject(error);
        //             // }
        //             //
        //             // originalRequest._retry = true;
        //             //
        //             // return this._client
        //             //     .post("/api/auth/refresh", {
        //             //         refresh_token: JSON.parse(token).refresh_token,
        //             //     })
        //             //     .then((res) => {
        //             //         if (res.status === 200) {
        //             //             const data = res.data.d;
        //             //             localStorage.setItem("USER_TOKEN", JSON.stringify(data));
        //             //             this._client.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        //             //             return this._client(originalRequest);
        //             //         }
        //             //     });
        //         }
        //
        //         return Promise.reject(error);
        //     }
        // );
    }

    client() {
        return this._client;
    }
}
