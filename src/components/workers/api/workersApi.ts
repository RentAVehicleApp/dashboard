import type { ResponseTicketDto } from "../types/Ticket";
import type {
    CreateWorkerDto,
    ResponseWorkerDto,
    UpdateWorkerDto,
    WorkerWithTicketsDto
} from "../types/Worker";
import { workerApi } from "../../users/api/axios";

function unwrapAxiosError(err: any, extra: Record<string, any> = {}) {
    const debug = {
        status: err?.response?.status,
        data: err?.response?.data,
        url: (err?.config?.baseURL || "") + (err?.config?.url || ""),
        ...extra,
    };
    console.error(debug);
    // прокидываем дальше, чтобы UI мог показать toast
    const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        `HTTP ${debug.status ?? ""}`.trim() ||
        "Request failed";
    const e = new Error(message);
    (e as any).debug = debug;
    throw e;
}

// — health для быстрой проверки, что роутинг верный
export const workerHealth = async (): Promise<string> => {
    try {
        const res = await workerApi.get("/health"); // GET /api/v1/worker/health
        return res.data;
    } catch (err) {
        unwrapAxiosError(err);
    }
    return "ERR";
};

export const createWorker = async (data: CreateWorkerDto): Promise<ResponseWorkerDto> => {
    try {
        const res = await workerApi.post("", data); // POST /api/v1/worker
        return res.data;
    } catch (err) {
        unwrapAxiosError(err, { payload: data });
    }
    // TS успокоить
    // @ts-expect-error unreachable
    return null;
};

export const updateWorker = async (id: number, data: UpdateWorkerDto): Promise<ResponseWorkerDto> => {
    try {
        const res = await workerApi.post(`/${id}`, data); // POST /api/v1/worker/{id}
        return res.data;
    } catch (err) {
        unwrapAxiosError(err, { payload: data });
    }
    // @ts-expect-error unreachable
    return null;
};

export const getWorkerById = async (id: number): Promise<ResponseWorkerDto> => {
    try {
        const res = await workerApi.get(`/${id}`);
        return res.data;
    } catch (err) {
        unwrapAxiosError(err);
    }
    // @ts-expect-error unreachable
    return null;
};

export const deleteWorker = async (id: number): Promise<boolean> => {
    try {
        const res = await workerApi.delete(`/${id}`);
        return res.data;
    } catch (err) {
        unwrapAxiosError(err);
    }
    return false;
};

// назначение/переназначение
export const assignTicket = async (ticketId: number, workerId: number) => {
    try {
        const res = await workerApi.post(`/${workerId}/ticket/${ticketId}/assign`);
        return res.data;
    } catch (err) {
        unwrapAxiosError(err);
    }
    return null;
};

export const reassignTicket = async (ticketId: number, workerId: number) => {
    try {
        const res = await workerApi.post(`/${workerId}/ticket/${ticketId}/reassign`);
        return res.data;
    } catch (err) {
        unwrapAxiosError(err);
    }
    return null;
};

// все воркеры (страница)
export const getAllWorkers = async (): Promise<WorkerWithTicketsDto[]> => {
    try {
        const res = await workerApi.get("/workers", {
            params: { page: 0, size: 100, sort: "id,asc" },
        }); // GET /api/v1/worker/workers
        return res.data?.content ?? [];
    } catch (err) {
        unwrapAxiosError(err);
    }
    return [];
};

// поиск: используем CONTAINS, а не LIKE; на 500 — бросаем нормальную ошибку
export const searchWorkers = async (term: string): Promise<WorkerWithTicketsDto[]> => {
    const params: Record<string, string | number> = { page: 0, size: 100, sort: "name,asc" };
    if (term.trim()) params.filter = `name:CONTAINS:${term.trim()}`;

    try {
        const res = await workerApi.get("/search/workers", { params }); // GET /api/v1/worker/search/workers
        const items: ResponseWorkerDto[] = res.data?.content ?? [];
        return items.map((w) => ({ ...w, tickets: [] as ResponseTicketDto[] }));
    } catch (err) {
        unwrapAxiosError(err, { params });
    }
    return [];
};


