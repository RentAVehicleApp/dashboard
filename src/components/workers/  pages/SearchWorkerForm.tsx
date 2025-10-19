import { useState } from "react";
import type {WorkerWithTicketsDto} from "../types/Worker.ts";
import {searchWorkers} from "../api/workersApi.ts";

interface Props {
    onSelect: (workerId: number) => void;
}

export const SearchWorkerForm = ({ onSelect }: Props) => {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState<WorkerWithTicketsDto[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const workers = await searchWorkers(term);
        setResults(workers);
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search by name or login"
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {results.length > 0 && (
                <table className="min-w-full border">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Login</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((worker) => (
                        <tr key={worker.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{worker.id}</td>
                            <td className="p-2 border">{worker.name}</td>
                            <td className="p-2 border">{worker.login}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => onSelect(worker.id)}
                                    className="text-blue-600 underline"
                                >
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
