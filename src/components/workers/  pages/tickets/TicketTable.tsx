import { useState } from "react";
import type { ResponseTicketDto } from "../../types/Ticket.ts";
import { Link } from "react-router";

interface Props {
    tickets: ResponseTicketDto[];
    onSearch: (term: string) => void;
}

export const TicketTable = ({ tickets, onSearch }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full max-w-xs"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>
            {tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <table className="min-w-full border">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Header</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Created By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="p-2 border">
                                <Link to={`/tickets/${ticket.id}`} className="text-blue-600 underline">
                                    {ticket.id}
                                </Link>
                            </td>
                            <td className="p-2 border">{ticket.header}</td>
                            <td className="p-2 border">{ticket.status}</td>
                            <td className="p-2 border">{ticket.createdByUserName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
