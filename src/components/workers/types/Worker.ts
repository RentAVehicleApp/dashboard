import type {ResponseTicketDto} from "./Ticket.ts";

export interface CreateWorkerDto {
    login: string;
    name: string;
}

export interface UpdateWorkerDto {
    login: string;
    name: string;
}

export interface ResponseWorkerDto {
    id: number;
    login: string;
    name: string;
}

export interface WorkerWithTicketsDto extends ResponseWorkerDto {
    tickets: ResponseTicketDto[];
}

