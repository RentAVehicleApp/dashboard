import { useEffect, useState } from "react";
import {useParams} from "react-router";
import type {ResponseTicketDto} from "../../types/Ticket.ts";
import {SearchWorkerForm} from "../SearchWorkerForm.tsx";
import {getTicket} from "../../api/ticketsApi.ts";
import {reassignTicket} from "../../api/workersApi.ts";

export const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState<ResponseTicketDto | null>(null);

    useEffect(() => {
        if (id) {
            getTicket(+id).then(setTicket);
        }
    }, [id]);

    if (!ticket) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Header:</strong> {ticket.header}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Created By:</strong> {ticket.createdByUserName}</p>
            <p><strong>Description:</strong> {ticket.problem}</p>
            {ticket.status !== "DONE" && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Reassign Ticket</h3>
                    <SearchWorkerForm
                        onSelect={async (workerId) => {
                            try {
                                const updated = await reassignTicket(ticket.id, workerId);
                                setTicket(updated);
                                alert("Ticket reassigned successfully");
                            } catch (err) {
                                console.error(err);
                                alert("Failed to reassign ticket");
                            }
                        }}
                    />
                </div>
            )}

        </div>
    );
};
