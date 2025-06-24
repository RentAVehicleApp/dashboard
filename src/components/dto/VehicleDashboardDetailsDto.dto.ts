export interface VehicleDashboardDetailsDto {
    id: number;
    registrationNumber: string;
    vehicleModel: 'MODEL1' | 'MODEL2' | 'MODEL3';
    availability: 'IN_USE' | 'UNDER_REPAIR' | 'DISCONNECTED';
    point: { x: number; y: number } | null;
    nodes: string;
    device: {
        id: number;
        serialNumber: string;
        deviceModel: 'MODEL1' | 'MODEL2' | 'MODEL3';
        nodes: string;
        deviceConfig: {
            name: string;
        }
    }
}
