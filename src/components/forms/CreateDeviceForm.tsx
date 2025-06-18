import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
    configs: { id: number; name: string }[];
    onCreated: () => void;
}

export default function CreateDeviceForm({ configs, onCreated }: Props) {
    const [serialNumber, setSerialNumber] = useState('');
    const [deviceModel, setDeviceModel] = useState<'MODEL1' | 'MODEL2' | 'MODEL3'>('MODEL1');
    const [deviceConfigId, setDeviceConfigId] = useState(0);
    const [nodes, setNodes] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/v1/devices`, {
                serialNumber,
                deviceModel,
                deviceConfigId,
                nodes
            });
            alert('Device created successfully');
            setSerialNumber('');
            setNodes('');
            onCreated();
        } catch (error) {
            console.error('Error creating device:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new device</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Serial number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
                <select
                    value={deviceConfigId}
                    onChange={(e) => setDeviceConfigId(Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select configuration</option>
                    {configs.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <select
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value as any)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="MODEL1">MODEL1</option>
                    <option value="MODEL2">MODEL2</option>
                    <option value="MODEL3">MODEL3</option>
                </select>
                <input
                    type="text"
                    placeholder="Nodes"
                    value={nodes}
                    onChange={(e) => setNodes(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
}
