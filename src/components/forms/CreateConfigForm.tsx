import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
    onCreated: () => void;
}

export default function CreateConfigForm({ onCreated }: Props) {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/v1/deviceconfig`, { name });
            alert('Configuration created successfully');
            setName('');
            onCreated();
        } catch (error) {
            console.error('Error creating configuration:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new configuration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Configuration name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
}
