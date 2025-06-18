import { create } from 'zustand';
import axios from 'axios';
import type { VehicleDashboardDetailsDto } from "../components/dto/VehicleDashboardDetailsDto.dto.ts";

const API_URL = import.meta.env.VITE_API_URL;

interface VehicleState {
    vehicles: VehicleDashboardDetailsDto[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    fetchVehicles: (page?: number, size?: number) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
    vehicles: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,

    fetchVehicles: async (page = 0, size = 5) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/v1/vehicles/list`, {
                params: { page, size },
            });
            set({
                vehicles: response.data.content,
                page: response.data.number,
                totalPages: response.data.totalPages,
                loading: false,
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}));