import { create } from 'zustand';
import axios from 'axios';
import type {VehicleDashboardDetailsDto} from "../components/dto/VehicleDashboardDetailsDto.dto.ts";

const API_URL = import.meta.env.VITE_API_URL;

interface VehicleState {
    vehicles: VehicleDashboardDetailsDto[];
    loading: boolean;
    error: string | null;
    fetchVehicles: () => Promise<void>;
}


export const useVehicleStore = create<VehicleState>((set) => ({
    vehicles: [],
    loading: false,
    error: null,

    fetchVehicles: async () => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/v1/vehicles/list`);
            set({ vehicles: response.data.content, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}));
