// src/components/users/api/axios.ts
import axios from "axios";

export const userApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL1 ?? "https://user-service-6ai4.onrender.com",
    headers: { "Content-Type": "application/json" },
});

export const vehicleApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "https://device-service.onrender.com",
});

export const workerApi = axios.create({
    baseURL: (import.meta.env.VITE_API_URL2 ?? "https://worker-service-sy1z.onrender.com") + "/api/v1/worker",
    headers: { "Content-Type": "application/json" },
});

workerApi.interceptors.response.use(
    (r) => r,
    (err) => {
        console.error("workerApi error", {
            status: err?.response?.status,
            data: err?.response?.data,
            url: (err?.config?.baseURL || "") + (err?.config?.url || ""),
            method: err?.config?.method,
        });
        return Promise.reject(err);
    }
);
