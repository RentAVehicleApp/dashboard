import {workerApi} from "../users/api/axios.ts";

export const login = async (credentials: { username: string; password: string }) => {
    const response = await workerApi.post("/auth/login", credentials);
    return response.data;
};
