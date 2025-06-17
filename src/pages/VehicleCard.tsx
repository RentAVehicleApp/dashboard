import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const mockVehicleData = {
    vehicleId: 123n,
    registrationNumber: "EU-123",
    vehicleModel: "MODEL2",
    deviceId: 456n,
    availability: "IN_USE",
    location: [52.52, 13.405],
    batteryStatus: 80,
    vehicleNodes: "node-vehicle",
    serialNumber: "DVC002",
    deviceModel: "MODEL1",
    connectionStatus: "CONNECTED",
    nodes: "device-nodes",
    deviceConfigId: 789n,
    deviceConfigName: "Standard Config"
};

const COLORS = ['#10b981', '#e5e7eb'];

export default function VehicleCard() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<any>(null);

    useEffect(() => {
        setVehicle(mockVehicleData);
    }, [id]);

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Vehicle: {vehicle.registrationNumber}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Charge</h3>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={[{ value: vehicle.charge }, { value: 100 - vehicle.charge }]}
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
                    <p className="text-center font-bold">{vehicle.batteryStatus}%</p>
                </div>

                <div className="bg-white shadow rounded p-4 space-y-2">
                    <p><strong>Model:</strong> {vehicle.vehicleModel}</p>
                    <p><strong>Availability:</strong> {vehicle.availability}</p>
                    <p><strong>Device serial number:</strong> {vehicle.serialNumber}</p>
                    <p><strong>Device:</strong> {vehicle.deviceModel}</p>
                    <p><strong>Device status:</strong> {vehicle.connectionStatus}</p>
                    <p><strong>Config:</strong> {vehicle.deviceConfigName}</p>
                    <p><strong>Location:</strong> {vehicle.location}</p>
                </div>
            </div>
        </div>
    );
}