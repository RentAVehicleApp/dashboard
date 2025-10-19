import type {TicketStatus} from "./TicketStatus.ts";

export interface CreateTicketDto {
    id?: number;
    createdByUserId: number;
    createdByUserName: string;
    header: string;
    problem: string;
    createdDate?: string;
    updatedAt?: string;
    status?: TicketStatus;
}

export interface UpdateTicketDto {
    header: string;
    problem: string;
}

export interface ResponseTicketDto {
    id: number;
    header: string;
    problem: string;
    createdByUserId: number;
    createdByUserName: string;
    createdDate: string;
    updatedAt: string;
    status: TicketStatus;
    assignedSupporterId?: number;
}

