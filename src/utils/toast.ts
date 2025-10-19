import { toast } from 'react-toastify';

export function toastApiError(err: any, fallback = 'Request failed') {
    const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (typeof err?.response?.data === 'string' ? err.response.data : '') ||
        err?.message ||
        fallback;
    toast.error(msg);
}