import type {CreateTicketDto, ResponseTicketDto, UpdateTicketDto} from "../types/Ticket.ts";
import {workerApi} from "../../users/api/axios.ts";
import type {CustomPage} from "../types/Search.ts";

export const createTicket = async (data: CreateTicketDto): Promise<ResponseTicketDto> => {
    const res = await workerApi.post("/ticket", data); // POST /api/v1/worker/ticket
    return res.data;
};

export const updateTicket = async (id: number, data: UpdateTicketDto): Promise<ResponseTicketDto> => {
    const res = await workerApi.post(`/ticket/${id}`, data); // POST /api/v1/worker/ticket/{id}
    return res.data;
};

export const getTicket = async (id: number): Promise<ResponseTicketDto> => {
    const res = await workerApi.get(`/ticket/${id}`); // GET /api/v1/worker/ticket/{id}
    return res.data;
};

export const deleteTicket = async (id: number): Promise<boolean> => {
    const res = await workerApi.delete(`/ticket/${id}`); // DELETE /api/v1/worker/ticket/{id}
    return res.data;
};

export const closeTicket = async (id: number): Promise<ResponseTicketDto> => {
    const res = await workerApi.post(`/ticket/${id}/close`); // POST /api/v1/worker/ticket/{id}/close
    return res.data;
};

export const getAllTickets = async (): Promise<CustomPage<ResponseTicketDto>> => {
    const res = await workerApi.get("/tickets"); // GET /api/v1/worker/tickets
    return res.data;
};

export const searchTickets = async (
    term: string,
    page = 0,
    size = 20,
    sort = "updatedDate,desc"
): Promise<CustomPage<ResponseTicketDto>> => {
    // По Postman: это GET /api/v1/worker/search/tickets?filter=problem:CONTAINS:...
    const params: Record<string, string | number> = { page, size, sort };
    if (term.trim()) {
        params.filter = `problem:CONTAINS:${term.trim()}`;
    }
    const res = await workerApi.get("/search/tickets", { params });
    return res.data;
};
