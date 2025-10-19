export const TicketStatus = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE"
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
