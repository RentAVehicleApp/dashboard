// src/components/workers/pages/tickets/Tickets.tsx
import { useEffect, useState } from "react";
import type { CreateTicketDto, ResponseTicketDto } from "../../types/Ticket";
import { createTicket, getAllTickets, searchTickets } from "../../api/ticketsApi";
import TicketForm from "./TicketForm";
import { TicketTable } from "./TicketTable";

export const Tickets = () => {
    const [tickets, setTickets] = useState<ResponseTicketDto[]>([]);
    const [showForm, setShowForm] = useState(false);

    const fetchTickets = async (term = "") => {
        const page = term.trim()
            ? await searchTickets(term)
            : await getAllTickets();
        setTickets(page.content ?? []);
    };

    useEffect(() => {
        void fetchTickets();
    }, []);

    const handleCreate = async (data: CreateTicketDto) => {
        await createTicket(data);
        await fetchTickets();
        setShowForm(false);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Tickets</h2>
                <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-3 py-1 rounded">
                    {showForm ? "Cancel" : "Add ticket"}
                </button>
            </div>

            {showForm && <TicketForm onSubmit={handleCreate} />}
            <TicketTable tickets={tickets} onSearch={fetchTickets} />
        </div>
    );
};
