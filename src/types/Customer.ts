export type LicenseType = "A" | "B" | "C" | "D";

export interface CreateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    licenseType: LicenseType;
    drivingLicenseNumber: string;
}

export interface CustomerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    licenseType: LicenseType;
    drivingLicenseNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface CustomPage<T> {
    content: T[];
    totalElements?: number;
    totalPages?: number;
    number?: number;
    size?: number;
}
