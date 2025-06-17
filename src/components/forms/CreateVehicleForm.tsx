import { useState } from 'react';

export default function CreateVehicleForm() {
    const [regNum, setRegNum] = useState('');
    const [model, setModel] = useState('');
    const [device, setDevice] = useState('');

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new vehicle</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Vehicle: ${regNum}, Model: ${model}, Device: ${device}`);
                }}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Registration number"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
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
                    placeholder="Select device"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
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
