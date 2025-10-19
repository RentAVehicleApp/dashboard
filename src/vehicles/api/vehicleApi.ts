import type {VehicleDashboardDetailsDto} from "../dto/VehicleDashboardDetailsDto.dto.ts";

const VEHICLE_API = import.meta.env.VITE_API_URL;

export const fetchVehicles = async (): Promise<VehicleDashboardDetailsDto[]> => {
    const res = await fetch(`${VEHICLE_API}/api/v1/vehicles/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: 0,
            size: 1000,
            sort: "id,asc",
        }),
    });

    if (!res.ok) throw new Error("Failed to fetch vehicles");
    return res.json();
};
