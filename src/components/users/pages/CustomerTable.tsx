import type { CustomerResponse } from "../../../types/Customer";
import { Link } from "react-router";
import { useState } from "react";

interface Props {
    customers: CustomerResponse[];
    onSearch: (term: string) => void;
}

export function CustomerTable({ customers, onSearch }: Props) {
    const [term, setTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="border p-2 rounded w-full max-w-sm"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {!customers.length ? (
                <p>No customers found.</p>
            ) : (
                <table className="min-w-full border">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">License number</th>
                        <th className="p-2 border">First name</th>
                        <th className="p-2 border">Last name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">License type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-2 border text-blue-600 underline">
                                <Link to={`/customer/${c.id}`}>{c.drivingLicenseNumber}</Link>
                            </td>
                            <td className="p-2 border">{c.firstName}</td>
                            <td className="p-2 border">{c.lastName}</td>
                            <td className="p-2 border">{c.email}</td>
                            <td className="p-2 border">{c.phoneNumber}</td>
                            <td className="p-2 border">{c.licenseType}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
