import { useState } from "react";
import { useNavigate } from "react-router";
import type { WorkerWithTicketsDto } from "../../types/Worker.ts";
import { deleteWorker } from "../../api/workersApi.ts";

interface WorkerTableProps {
    workers: WorkerWithTicketsDto[];
    onSearch: (term?: string) => Promise<void>;
}

export default function WorkerTable({ workers, onSearch }: WorkerTableProps) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = async () => {
        await onSearch(searchTerm);
    };

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full max-w-xs"
                />
                <button
                    onClick={handleSearchClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {workers.length === 0 ? (
                <p>No workers found.</p>
            ) : (
                <table className="min-w-full border">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Login</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Tickets</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-gray-50">

                            <td className="p-2 border">{worker.id}</td>
                            <td className="p-2 border">{worker.login}</td>
                            <td className="p-2 border">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => navigate(`/workers/${worker.id}`)}
                                >
                                    {worker.name}
                                </button>
                            </td>
                            <td className="p-2 border">{(worker.tickets?.length ?? 0)}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => navigate(`/workers/${worker.id}`)}
                                    className="text-blue-600 underline"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => navigate(`/workers/edit/${worker.id}`)}
                                    className="text-green-600 underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={async () => {
                                        if (
                                            confirm(`Are you sure you want to delete ${worker.name}?`)
                                        ) {
                                            await deleteWorker(worker.id);
                                            await onSearch("");
                                        }
                                    }}
                                    className="text-red-600 underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
