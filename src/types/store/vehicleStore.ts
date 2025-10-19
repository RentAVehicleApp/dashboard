import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface VehicleState {
    vehicles: any[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    fetchVehicles: (
        page: number,
        size: number,
        searchTerm: string,
        sortBy: string,
        sortDir: 'asc' | 'desc',
        vehicleModel?: string,
        deviceModel?: string,
        availability?: string,
        configIds?: number[]
    ) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
    vehicles: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,

    fetchVehicles: async (
        page,
        size,
        search,
        sortBy,
        sortDir,
        vehicleModel,
        deviceModel,
        availability,
        configIds
    ) => {
        set({ loading: true, error: null });

        const params: Record<string, any> = {
            page,
            size,
            sort: `${sortBy},${sortDir}`,
        };

        if (search) {
            params.registrationNumberPart = search;
            params['listDevicesRequest.serialNumberPart'] = search;
        }
        if (vehicleModel) params.vehicleModel = vehicleModel;
        if (deviceModel) params['listDevicesRequest.deviceModel'] = deviceModel;
        if (availability) params.availability = availability;
        if (configIds && configIds.length) {
            params['listDevicesRequest.deviceConfigIds'] = configIds.join(',');
        }

        try {
            const { data } = await axios.get(`${API_URL}/v1/vehicles/search`, { params });
            set({
                vehicles: data.content,
                page: data.number,
                totalPages: data.totalPages,
                loading: false,
            });
        } catch (e) {
            set({ error: 'Failed to fetch vehicles', loading: false });
        }
    },
}));
