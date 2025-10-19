import { useState } from "react";
import { useNavigate } from "react-router";
import type { CreateTicketDto } from "../../types/Ticket.ts";

interface TicketFormProps {
    onSubmit: (data: CreateTicketDto) => Promise<void>;
}

export default function TicketForm({ onSubmit }: TicketFormProps) {
    const [form, setForm] = useState<CreateTicketDto>({
        createdByUserId: 1,
        createdByUserName: "Admin",
        header: "",
        problem: "",
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(form);
        navigate("/tickets");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input name="header" placeholder="Header" value={form.header} onChange={handleChange} className="border p-2 w-full" />
                <textarea name="problem" placeholder="Problem description" value={form.problem} onChange={handleChange} className="border p-2 w-full" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            </form>
        </div>
    );
}
