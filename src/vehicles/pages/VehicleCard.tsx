import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {vehicleApi} from "../../components/users/api/axios.ts";

const API_URL = import.meta.env.VITE_API_URL;

interface Point {
    x: number;
    y: number;
}

interface PointFromLatLonDto {
    latitude: string;
    longitude: string;
}

interface DeviceConfig {
    id: number;
    name: string;
}

interface Device {
    id: number;
    serialNumber: string;
    deviceModel: string;
    deviceConfig?: DeviceConfig;
    nodes?: string;
}

interface Vehicle {
    id: number;
    registrationNumber: string;
    vehicleModel: string;
    batteryStatus?: number;
    availability: string;
    point?: Point;
    nodes?: string;
    device?: Device;
    pointFromLatLonDto?: PointFromLatLonDto;
}

export default function VehicleCard() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [batteryStatus, setBatteryStatus] = useState<number>(80);
    const [availability, setAvailability] = useState<string>('IN_USE');
    const [deviceId, setDeviceId] = useState<number | null>(null);
    const [deviceList, setDeviceList] = useState<Device[]>([]);
    const [configList, setConfigList] = useState<DeviceConfig[]>([]);
    const [selectedConfigId, setSelectedConfigId] = useState<number | null>(null);
    const [deviceModel, setDeviceModel] = useState<string>('');
    const [vehicleNodes, setVehicleNodes] = useState<string>('');
    const [deviceNodes, setDeviceNodes] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!deviceId) {
            setDeviceModel('');
            setDeviceNodes('');
            return;
        }

        const selectedDevice = deviceList.find((d) => d.id === deviceId);
        if (selectedDevice) {
            setDeviceModel(selectedDevice.deviceModel);
            setDeviceNodes(selectedDevice.nodes ?? '');
        }
    }, [deviceId, deviceList]);

    useEffect(() => {
        async function fetchVehicle() {
            if (!id || isNaN(Number(id))) {
                setError('Invalid vehicle ID');
                return;
            }
            try {
                const res = await vehicleApi.get(`${API_URL}/v1/vehicles/${id}`);
                const v: Vehicle = res.data;
                setVehicle(v);
                setBatteryStatus(v.batteryStatus ?? 80);
                setAvailability(v.availability);
                setDeviceId(v.device?.id ?? null);
                setVehicleNodes(v.nodes ?? '');
                setDeviceNodes(v.device?.nodes ?? '');
                setSelectedConfigId(v.device?.deviceConfig?.id ?? null);
                setDeviceModel(v.device?.deviceModel ?? '');
            } catch (err: any) {
                console.error('Failed to fetch vehicle', err);
                setError('Unable to load vehicle data');
            }
        }

        async function fetchOptions() {
            try {
                const [freeDevicesRes, configsRes] = await Promise.all([
                    vehicleApi.get(`${API_URL}/v1/devices/without-vehicle?page=0&size=1000&sort=id,asc`),
                    vehicleApi.get(`${API_URL}/v1/deviceconfig/list?page=0&size=1000`)
                ]);

                const freeDevices: Device[] = freeDevicesRes.data.content;

                if (vehicle?.device && !freeDevices.find(d => d.id === vehicle.device!.id)) {
                    freeDevices.push(vehicle.device);
                }

                setDeviceList(freeDevices);
                setConfigList(configsRes.data.content);
            } catch (err) {
                console.error('Error loading select options', err);
            }
        }

        fetchVehicle();
        fetchOptions();
    }, [id]);

    const handleUpdate = async () => {
        if (!vehicle) return;
        const updateData = {
            id: vehicle.id,
            registrationNumber: vehicle.registrationNumber,
            vehicleModel: vehicle.vehicleModel,
            deviceId,
            availability,
            point: vehicle.point ?? null,
            batteryStatus,
            nodes: vehicleNodes
        };

        const deviceUpdateData = {
            id: deviceId,
            nodes: deviceNodes
        };

        console.log('Sending update to backend:', updateData);

        try {
            await vehicleApi.put(`${API_URL}/v1/vehicles/${vehicle.id}`, updateData);
            if (deviceId) {
                await vehicleApi.put(`${API_URL}/v1/devices/${deviceId}`, deviceUpdateData);
            }
            toast.success('Vehicle updated successfully');
        } catch (err: any) {
            console.error('Error updating vehicle', err);
            toast.error('Failed to update vehicle');
        }
    };

    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!vehicle) return <div className="p-4">Loading...</div>;

    const location = vehicle.point ? `${vehicle.point.x}, ${vehicle.point.y}` : 'No position';
    const latLon = vehicle.pointFromLatLonDto
        ? `${vehicle.pointFromLatLonDto.latitude}, ${vehicle.pointFromLatLonDto.longitude}`
        : 'No coordinates';

    const COLORS = [getBatteryColor(batteryStatus), '#e5e7eb'];

    function getBatteryColor(percent: number): string {
        const r = percent < 50 ? 255 : Math.round(255 - (percent - 50) * 5.1);
        const g = percent > 50 ? 255 : Math.round(percent * 5.1);
        return `rgb(${r},${g},0)`;
    }

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Vehicle: {vehicle.registrationNumber}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Charge</h3>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={[
                                { value: batteryStatus },
                                { value: 100 - batteryStatus }
                            ]}
                            dataKey="value"
                            innerRadius={50}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {COLORS.map((color, index) => (
                                <Cell key={index} fill={color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <p className="text-center font-bold">{batteryStatus}%</p>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(Number(e.target.value))}
                        className="w-full mt-2"
                    />
                    <button
                        onClick={handleUpdate}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>

                <div className="bg-white shadow rounded p-4 space-y-2">
                    <label className="block">
                        <span className="font-semibold">Availability:</span>
                        <select
                            className="block w-full border rounded px-2 py-1 mt-1"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="IN_USE">IN_USE</option>
                            <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                            <option value="DISCONNECTED">DISCONNECTED</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="font-semibold">Device serial number:</span>
                        <select
                            className="block w-full border rounded px-2 py-1 mt-1"
                            value={deviceId ?? ''}
                            onChange={(e) => setDeviceId(Number(e.target.value))}
                        >
                            <option value="">Select device</option>
                            {deviceList.map((dev) => (
                                <option key={dev.id} value={dev.id}>{dev.serialNumber}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="font-semibold">Device model:</span>
                        <input
                            type="text"
                            value={deviceModel}
                            readOnly
                            className="block w-full border rounded px-2 py-1 mt-1 bg-gray-100 text-gray-700"
                        />
                    </label>

                    <label className="block">
                        <span className="font-semibold">Device nodes:</span>
                        <input
                            type="text"
                            value={deviceNodes}
                            onChange={(e) => setDeviceNodes(e.target.value)}
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>

                    <label className="block">
                        <span className="font-semibold">Vehicle nodes:</span>
                        <input
                            type="text"
                            value={vehicleNodes}
                            onChange={(e) => setVehicleNodes(e.target.value)}
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>

                    <label className="block">
                        <span className="font-semibold">Device config:</span>
                        <select
                            className="block w-full border rounded px-2 py-1 mt-1"
                            value={selectedConfigId ?? ''}
                            onChange={(e) => setSelectedConfigId(Number(e.target.value))}
                        >
                            <option value="">Select config</option>
                            {configList.map((cfg) => (
                                <option key={cfg.id} value={cfg.id}>{cfg.name}</option>
                            ))}
                        </select>
                    </label>

                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Coordinates:</strong> {latLon}</p>
                </div>
            </div>
        </div>
    );
}
