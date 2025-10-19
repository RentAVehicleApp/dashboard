import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

type VehicleModel = 'MODEL1' | 'MODEL2' | 'MODEL3'; // проверь соответствие enum на бэке
type Availability = 'AVAILABLE' | 'IN_USE' | 'UNDER_REPAIR' | 'DISCONNECTED';

interface Props {
    devices: { id: number; serialNumber: string }[];
    onCreated: () => void;
}

export default function CreateVehicleForm({ devices, onCreated }: Props) {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState<VehicleModel>('MODEL1');
    const [deviceId, setDeviceId] = useState<number | ''>('');
    const [availability, setAvailability] = useState<Availability>('AVAILABLE');
    const [nodes, setNodes] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [batteryStatus, setBatteryStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Если у бэка префикс /api/v1, поменяй строку ниже
    const VEHICLES_URL = `${API_URL}/v1/vehicles`;
    const DEVICES_URL  = `${API_URL}/v1/devices`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registrationNumber.trim()) return toast.warn('Registration number is required');
        if (!deviceId || typeof deviceId !== 'number') return toast.warn('Select device');

        const idNum = Number(deviceId);

        // 1) Проверим, что выбранное устройство реально существует в ЭТОМ же окружении
        try {
            await axios.get(`${DEVICES_URL}/${idNum}`);
        } catch (err: any) {
            const st = err?.response?.status;
            toast.error(st === 404 ? 'Device not found on server' : 'Failed to verify device');
            return;
        }

        // 2) Готовим payload ровно под VehicleCreateUpdateDto
        const dto: any = {
            registrationNumber: registrationNumber.trim(),
            vehicleModel,                 // VehicleModel enum
            deviceId: idNum,              // long deviceId
            availability,                 // Availability enum
        };

        if (nodes.trim()) dto.nodes = nodes.trim();

        const bs = batteryStatus.trim();
        if (bs !== '' && !Number.isNaN(Number(bs))) {
            dto.batteryStatus = Number(bs); // Integer
        }

        const lat = latitude.trim();
        const lon = longitude.trim();
        if (lat && lon) {
            dto.pointFromLatLonDto = { latitude: lat, longitude: lon }; // ИМЕНА ПОЛЕЙ ТОЧНО КАК В DTO
        }

        setLoading(true);
        try {
            await axios.post(VEHICLES_URL, dto, { headers: { 'Content-Type': 'application/json' } });
            toast.success('Vehicle created');
            // reset
            setRegistrationNumber('');
            setDeviceId('');
            setVehicleModel('MODEL1');
            setAvailability('AVAILABLE');
            setNodes('');
            setLatitude('');
            setLongitude('');
            setBatteryStatus('');
            onCreated();
        } catch (error: any) {
            const status = error?.response?.status;
            const data = error?.response?.data;
            console.error('Error creating vehicle:', { status, data, url: VEHICLES_URL, payload: dto });

            const msg =
                data?.message ||
                data?.error ||
                (typeof data === 'string' ? data : '') ||
                error?.message ||
                'Failed to create vehicle';

            toast.error(String(msg));

            if (status === 404) {
                toast.info('Related entity not found (likely deviceId). Make sure you use the same API base for list & create.');
            } else if (status === 400 || status === 422) {
                toast.info('Check required fields, enums and registration number format/uniqueness.');
            } else if (status === 500) {
                toast.info('Server error. Most common: wrong enum value or internal constraint (duplicate reg number). Try another registrationNumber.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add new vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />

                <select
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value ? Number(e.target.value) : '')}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select device</option>
                    {devices.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.serialNumber}
                        </option>
                    ))}
                </select>

                <select
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value as VehicleModel)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="MODEL1">MODEL1</option>
                    <option value="MODEL2">MODEL2</option>
                    <option value="MODEL3">MODEL3</option>
                </select>

                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as Availability)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="IN_USE">IN_USE</option>
                    <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                    <option value="DISCONNECTED">DISCONNECTED</option>
                </select>

                <div className="grid md:grid-cols-3 gap-2">
                    <input
                        type="text"
                        placeholder="Latitude (optional)"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Longitude (optional)"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Battery (0-100, optional)"
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(e.target.value)}
                        className="border rounded px-3 py-2"
                        min={0}
                        max={100}
                    />
                </div>

                <input
                    type="text"
                    placeholder="Nodes (optional)"
                    value={nodes}
                    onChange={(e) => setNodes(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? 'Creating…' : 'Create'}
                </button>
            </form>
        </div>
    );
}
