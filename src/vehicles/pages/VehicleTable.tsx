import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import qs from 'qs';
import axios from 'axios';
import CreateDeviceForm from '../forms/CreateDeviceForm.tsx';
import CreateConfigForm from '../forms/CreateConfigForm.tsx';
import CreateVehicleForm from '../forms/CreateVehicleForm.tsx';
import { vehicleApi } from '../../components/users/api/axios.ts';

const API_BASE = import.meta.env.VITE_API_URL;
const debounceMs = 300;

export default function VehicleTable() {
    const [sp, setSp] = useSearchParams();

    const [search, setSearch] = useState(sp.get('q') ?? '');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [vehicleModel, setVehicleModel] = useState(sp.get('vm') ?? '');
    const [deviceModel, setDeviceModel] = useState(sp.get('dm') ?? '');
    const [availability, setAvailability] = useState(sp.get('av') ?? '');
    const [batteryMin, setBatteryMin] = useState('');
    const [batteryMax, setBatteryMax] = useState('');
    const [nodes, setNodes] = useState('');
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const [showForms, setShowForms] = useState(false);
    const [deviceConfigs, setDeviceConfigs] = useState([]);
    const [devices, setDevices] = useState([]);

    const fetchVehicles = useCallback(() => {
        const params: Record<string, string> = {
            registrationNumberPart: search || '',
            vehicleModel,
            deviceModel,
            availability,
            batteryStatusMin: batteryMin,
            batteryStatusMax: batteryMax,
            nodes,
        };
        Object.keys(params).forEach((k) => !params[k] && delete params[k]);
        setSp(params, { replace: true });

        setLoading(true);

        vehicleApi.get('/v1/vehicles/search', {
            params: {
                ...params,
                page: 0,
                size: 1000,
                sort: 'id,asc',
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        })
            .then((res) => {
                setVehicles(res.data.content);
                setError('');
            })
            .catch(() => setError('Failed to find vehicles'))
            .finally(() => setLoading(false));
    }, [search, vehicleModel, deviceModel, availability, batteryMin, batteryMax, nodes, setSp]);

    const searchDebounce = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchDebounce.current) clearTimeout(searchDebounce.current);
        searchDebounce.current = setTimeout(() => fetchVehicles(), debounceMs);
        return () => clearTimeout(searchDebounce.current!);
    }, [search, fetchVehicles]);

    const loadCreationData = async () => {
        try {
            const [confRes, devRes] = await Promise.all([
                axios.get(`${API_BASE}/v1/deviceconfig/list?page=0&size=1000`),
                axios.get(`${API_BASE}/v1/devices/list?page=0&size=1000`),
            ]);
            setDeviceConfigs(confRes.data.content);
            setDevices(devRes.data.content);
        } catch (error) {
            console.error('Error loading creation data:', error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchVehicles();
                }}
                className="bg-white shadow rounded p-4 space-y-2"
            >
                <div className="flex gap-2">
                    <input
                        placeholder="Search reg. № or serial №"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button className="bg-blue-600 text-white px-4 rounded">Search</button>
                    <button
                        type="button"
                        className="text-blue-600"
                        onClick={() => setShowAdvanced((s) => !s)}
                    >
                        {showAdvanced ? 'Hide filters' : 'Filters'}
                    </button>
                </div>

                {showAdvanced && (
                    <div className="grid md:grid-cols-3 gap-2 pt-2">
                        <select value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Vehicle model</option>
                            <option value="MODEL1">MODEL1</option>
                            <option value="MODEL2">MODEL2</option>
                            <option value="MODEL3">MODEL3</option>
                        </select>

                        <select value={deviceModel} onChange={(e) => setDeviceModel(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Device model</option>
                            <option value="MODEL1">MODEL1</option>
                            <option value="MODEL2">MODEL2</option>
                            <option value="MODEL3">MODEL3</option>
                        </select>

                        <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Availability</option>
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="IN_USE">IN_USE</option>
                            <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                            <option value="DISCONNECTED">DISCONNECTED</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Battery min"
                            value={batteryMin}
                            onChange={(e) => setBatteryMin(e.target.value)}
                            className="border rounded px-2 py-1"
                        />

                        <input
                            type="number"
                            placeholder="Battery max"
                            value={batteryMax}
                            onChange={(e) => setBatteryMax(e.target.value)}
                            className="border rounded px-2 py-1"
                        />

                        <input
                            placeholder="Vehicle nodes"
                            value={nodes}
                            onChange={(e) => setNodes(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </div>
                )}
            </form>

            <div className="flex justify-end">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={async () => {
                        setShowForms((prev) => !prev);
                        if (!showForms) {
                            await loadCreationData();
                        }
                    }}
                >
                    {showForms ? 'Hide Add Forms' : '+ Create Vehicle'}
                </button>
            </div>

            {showForms && (
                <div className="space-y-6">
                    <CreateConfigForm onCreated={loadCreationData} />
                    <CreateDeviceForm configs={deviceConfigs} onCreated={loadCreationData} />
                    <CreateVehicleForm
                        devices={devices}
                        onCreated={() => {
                            loadCreationData();
                            fetchVehicles();
                        }}
                    />
                </div>
            )}

            {loading ? (
                <p className="text-center py-4">Loading…</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-gray-50">
                    <table className="min-w-full bg-white text-sm border">
                        <thead>
                        <tr className="bg-gray-100">
                            {["Reg. number", "Vehicle model", "Availability", "Location", "Vehicle nodes", "Serial number", "Device model", "Device nodes", "Config"].map((label) => (
                                <th key={label} className="px-3 py-2 whitespace-nowrap">{label}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map((v) => (
                            <tr key={v.id} className="border-t hover:bg-gray-50">
                                <td className="px-3 py-1 text-blue-600">
                                    <Link to={`/vehicle/${v.id}`} className="hover:underline">
                                        {v.registrationNumber}
                                    </Link>
                                </td>
                                <td className="px-3 py-1">{v.vehicleModel}</td>
                                <td className="px-3 py-1">{v.availability}</td>
                                <td className="px-3 py-1">{v.point ? `${v.point.x}, ${v.point.y}` : '—'}</td>
                                <td className="px-3 py-1">{v.nodes}</td>
                                <td className="px-3 py-1">{v.device?.serialNumber}</td>
                                <td className="px-3 py-1">{v.device?.deviceModel}</td>
                                <td className="px-3 py-1">{v.device?.nodes}</td>
                                <td className="px-3 py-1">{v.device?.deviceConfig?.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
