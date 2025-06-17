import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Link} from "react-router";

const center: [number, number] = [50.8503, 4.3517];

const vehicles = [
    {
        id: 'EU-123',
        name: 'Scooter A',
        position: [48.8566, 2.3522],
        battery: 80,
        state: 'Vacant',
        device: 'DVC001',
    },
    {
        id: 'EU-124',
        name: 'Bike B',
        position: [52.52, 13.405],
        battery: 80,
        state: 'Rented',
        device: 'DVC002',
        client: 'John Smith'
    },
];

export default function MapPage() {
    return (
        <div className="h-[70vh] w-full border rounded shadow overflow-hidden">
            <MapContainer center={center} zoom={5} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {vehicles.map((vehicles) => (
                    <Marker key={vehicles.id} position={vehicles.position as [number, number]}>
                        <Popup>

                            <Link
                                to={`/vehicle/${vehicles.id}`}
                                className="font-semibold text-blue-600 hover:underline block"
                            >
                                {vehicles.id}
                            </Link>
                            <br />
                            Charge: {vehicles.battery}%
                            <br />
                            State: {vehicles.state}
                            <br />
                            Client: {vehicles.client}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}