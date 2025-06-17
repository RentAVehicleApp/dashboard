import { useState } from 'react';

export default function CreateDeviceForm() {
    const [serial, setSerial] = useState('');
    const [model, setModel] = useState('');
    const [config, setConfig] = useState('');

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new device</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Device: ${serial}, Model: ${model}, Config: ${config}`);
                }}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Serial number"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="text"
                    placeholder="Select configuration"
                    value={config}
                    onChange={(e) => setConfig(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
