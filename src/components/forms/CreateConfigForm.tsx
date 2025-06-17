import { useState } from 'react';

export default function CreateConfigForm() {
    const [name, setName] = useState('');

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new configuration</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Creating config: ${name}`);
                }}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Configuration name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
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