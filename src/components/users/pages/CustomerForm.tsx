import { useState } from "react";
import type { CreateCustomerDto, LicenseType } from "../../../types/Customer";

const initialForm: CreateCustomerDto = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    licenseType: "A",
    drivingLicenseNumber: "",
};

export const CustomerForm = ({ onSubmit }: { onSubmit: (data: CreateCustomerDto) => void }) => {
    const [form, setForm] = useState<CreateCustomerDto>(initialForm);

    return (
        <form
            className="grid grid-cols-2 gap-2 p-4 bg-gray-50 border rounded-lg"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <input
                className="border p-1"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
                className="border p-1"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <input
                className="border p-1 col-span-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                className="border p-1 col-span-2"
                placeholder="Phone"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />
            <input
                className="border p-1"
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            />
            <select
                className="border p-1"
                value={form.licenseType}
                onChange={(e) =>
                    setForm({ ...form, licenseType: e.target.value as LicenseType })
                }
            >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <input
                className="border p-1 col-span-2"
                placeholder="License number"
                value={form.drivingLicenseNumber}
                onChange={(e) => setForm({ ...form, drivingLicenseNumber: e.target.value })}
            />
            <button className="bg-blue-600 text-white py-1 rounded col-span-2 mt-2" type="submit">
                Add
            </button>
        </form>
    );
};
