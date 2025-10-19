import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getWorkerById, updateWorker } from "../../api/workersApi";
import type { ResponseWorkerDto } from "../../types/Worker";

export default function WorkerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [worker, setWorker] = useState<ResponseWorkerDto | null>(null);
    const [form, setForm] = useState({ login: "", name: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getWorkerById(+id)
                .then((data) => {
                    setWorker(data);
                    setForm({ login: data.login, name: data.name });
                    setLoading(false);
                })
                .catch(() => navigate("/workers"));
        }
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            const updated = await updateWorker(+id, form);
            setWorker(updated);
            alert("Worker updated successfully");
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Worker Info</h2>
                <p><strong>ID:</strong> {worker?.id}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Edit Worker</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                    <input
                        name="login"
                        value={form.login}
                        onChange={handleChange}
                        placeholder="Login"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border p-2 rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
