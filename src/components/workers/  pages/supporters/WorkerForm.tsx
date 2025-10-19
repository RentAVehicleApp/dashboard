import { useState } from "react";
import type {CreateWorkerDto} from "../../types/Worker.ts";

interface WorkerFormProps {
    onSubmit: (data: CreateWorkerDto) => Promise<void>;
}

export const WorkerForm = ({ onSubmit }: WorkerFormProps) => {
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ login, name });
        setLogin("");
        setName("");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Create Worker</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
};
