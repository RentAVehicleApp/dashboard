import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { CustomerResponse } from "../../../types/Customer";
import { getCustomerById } from "../api/customerApi.ts";

export const CustomerCard = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState<CustomerResponse | null>(null);

    useEffect(() => {
        if (id) {
            getCustomerById(Number(id)).then(setCustomer);
        }
    }, [id]);

    if (!customer) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-6 border bg-white rounded shadow max-w-2xl mx-auto mt-6">
            <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                        {customer.firstName} {customer.lastName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phoneNumber}</p>
                    <p><strong>Birth date:</strong> {customer.birthDate}</p>
                    <p><strong>License type:</strong> {customer.licenseType}</p>
                    <p><strong>License number:</strong> {customer.drivingLicenseNumber}</p>
                </div>

                <div className="w-32 h-32 rounded-md overflow-hidden shadow-md border">
                    <img
                        src="https://placehold.co/150x150?text=User"
                        alt={`${customer.firstName} ${customer.lastName}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Rent history</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600"></ul>
            </div>
        </div>
    );
};
