// src/components/workers/pages/supporters/Workers.tsx
import { useEffect, useState } from "react";
import { WorkerForm } from "./WorkerForm";
import WorkerTable from "./WorkerTable";
import { createWorker, searchWorkers, getAllWorkers, workerHealth } from "../../api/workersApi";
import type { CreateWorkerDto, WorkerWithTicketsDto } from "../../types/Worker";
import { toast } from "react-toastify";

export const Workers = () => {
    const [workers, setWorkers] = useState<WorkerWithTicketsDto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => { workerHealth().catch(() => toast.error("Worker service /health failed")); }, []);

    const fetchWorkers = async (term = ""): Promise<void> => {
        setLoading(true);
        try {
            if (!term.trim()) {
                const list = await getAllWorkers();
                setWorkers(list);
                return;
            }
            const list = await searchWorkers(term);
            // если у поиска нет id — fallback: берём полный список и фильтруем на клиенте
            if (list.some(w => w.id === undefined)) {
                const all = await getAllWorkers();
                const lower = term.toLowerCase();
                setWorkers(all.filter(w => (w.name ?? "").toLowerCase().includes(lower)));
            } else {
                setWorkers(list);
            }
        } catch (e: any) {
            toast.error(`Failed to load workers: ${e?.message ?? "Unknown error"}`);
            setWorkers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchWorkers(""); }, []);

    const handleCreate = async (data: CreateWorkerDto): Promise<void> => {
        try {
            await createWorker(data);
            toast.success("Worker created");
            await fetchWorkers();
            setShowForm(false);
        } catch (e: any) {
            toast.error(`Create failed: ${e?.message ?? "Unknown error"}`);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Supporters</h2>
                <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-3 py-1 rounded">
                    {showForm ? "Cancel" : "Add worker"}
                </button>
            </div>

            {showForm && <WorkerForm onSubmit={handleCreate} />}
            {loading ? <p className="p-4">Loading…</p> : <WorkerTable workers={workers} onSearch={fetchWorkers} />}
        </div>
    );
};
