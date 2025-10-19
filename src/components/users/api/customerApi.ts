import { userApi } from "./axios";
import type { CreateCustomerDto, CustomerResponse, CustomPage } from "../../../types/Customer";

const BASE = "/api/v1/customer";

export async function getAllCustomers(): Promise<CustomerResponse[]> {
    const res = await userApi.get<CustomPage<CustomerResponse>>(`${BASE}/all`);
    return res.data.content;
}

export async function getCustomerById(id: number): Promise<CustomerResponse> {
    const res = await userApi.get<CustomerResponse>(`${BASE}/${id}`);
    return res.data;
}

export async function createCustomer(data: CreateCustomerDto): Promise<CustomerResponse> {
    const res = await userApi.post<CustomerResponse>(`${BASE}`, data);
    return res.data;
}

export async function searchCustomers(
    term: string,
    page = 0,
    size = 100,
    sort = "id,desc"
): Promise<CustomerResponse[]> {
    const raw = term.trim();
    if (!raw) return [];


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const digits = raw.replace(/[^\d+]/g, "");

    let filter: string;
    if (emailRegex.test(raw)) {
        filter = `email:EQUALS:${raw}`;
    } else if (/^\+?\d{5,}$/.test(digits)) {
        filter = `phoneNumber:STARTS_WITH:${digits}`;
    } else if (raw.includes(" ")) {
        const [first, last] = raw.split(/\s+/).filter(Boolean);

        filter = last
            ? `lastName:STARTS_WITH:${last}`
            : `firstName:STARTS_WITH:${first}`;
    } else {
        filter = `firstName:STARTS_WITH:${raw}`;
    }

    try {
        const res = await userApi.get<CustomPage<CustomerResponse>>(`${BASE}/search`, {
            params: {filter, page, size, sort},
        });
        return res.data.content;
    } catch (e) {

        try {
            const res = await userApi.get<CustomPage<CustomerResponse>>(
                `${BASE}/customer/contain/${encodeURIComponent(raw)}`
            );
            return res.data.content;
        } catch {
            throw e;
        }
    }
}

export async function searchCustomerBy(email: string): Promise<CustomerResponse> {
    const res = await userApi.get<CustomerResponse>(`${BASE}/email/${email}`);
    return res.data;
}

export async function getCustomersByNamePattern(pattern: string) {
    const res = await userApi.get<CustomPage<CustomerResponse>>(`${BASE}/customer/contain/${encodeURIComponent(pattern)}`);
    return res.data.content;
}

export async function getCustomersByEmailBox(pattern: string) {
    const res = await userApi.post<CustomPage<CustomerResponse>>(`${BASE}/email/users_boxes/${encodeURIComponent(pattern)}`);
    return res.data.content;
}
