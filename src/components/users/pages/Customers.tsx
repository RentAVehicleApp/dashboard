import { useEffect, useState } from "react";
import { CustomerForm } from "./CustomerForm";
import { CustomerTable } from "./CustomerTable";
import type { CreateCustomerDto, CustomerResponse } from "../../../types/Customer";
import { createCustomer, getAllCustomers, searchCustomers } from "../api/customerApi.ts";

export const Customers = () => {
    const [customers, setCustomers] = useState<CustomerResponse[]>([]);
    const [showForm, setShowForm] = useState(false);

    const fetchCustomers = async (term: string = "") => {
        if (!term.trim()) {
            const all = await getAllCustomers();
            setCustomers(all);
            return;
        }
        const result = await searchCustomers(term);
        setCustomers(result);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleCreate = async (data: CreateCustomerDto) => {
        await createCustomer(data);
        fetchCustomers();
        setShowForm(false);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Customers</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    {showForm ? "Cancel" : "Add customer"}
                </button>
            </div>

            {showForm && <CustomerForm onSubmit={handleCreate} />}
            <CustomerTable customers={customers} onSearch={fetchCustomers} />
        </div>
    );
};
