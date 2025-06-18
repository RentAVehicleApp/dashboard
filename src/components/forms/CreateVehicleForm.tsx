import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
    devices: { id: number; serialNumber: string }[];
    onCreated: () => void;
}

export default function CreateVehicleForm({ devices, onCreated }: Props) {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState<'MODEL1' | 'MODEL2' | 'MODEL3'>('MODEL1');
    const [deviceId, setDeviceId] = useState(0);
    const [availibility, setAvailibility] = useState<'IN_USE' | 'UNDER_REPAIR' | 'DISCONNECTED'>('IN_USE');
    const [nodes, setNodes] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/v1/vehicles`, {
                registrationNumber,
                vehicleModel,
                deviceId,
                availibility,
                point: null,
                nodes,
                id: 0
            });
            alert('Vehicle created successfully');
            setRegistrationNumber('');
            setNodes('');
            onCreated();
        } catch (error) {
            console.error('Error creating vehicle:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
                <select
                    value={deviceId}
                    onChange={(e) => setDeviceId(Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select device</option>
                    {devices.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.serialNumber}
                        </option>
                    ))}
                </select>
                <select
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value as any)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="MODEL1">MODEL1</option>
                    <option value="MODEL2">MODEL2</option>
                    <option value="MODEL3">MODEL3</option>
                </select>
                <select
                    value={availibility}
                    onChange={(e) => setAvailibility(e.target.value as any)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="IN_USE">IN_USE</option>
                    <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                    <option value="DISCONNECTED">DISCONNECTED</option>
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
