import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import {vehicleApi} from "../../components/users/api/axios.ts";

// Статусы и цвета
const statusColors: Record<string, string> = {
    AVAILABLE: 'green',
    IN_USE: 'red',
    UNDER_REPAIR: 'gray',
    DISCONNECTED: 'orange',
};

// Иконка: цветной кружок
const getIcon = (color: string) =>
    new L.DivIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color:${color};width:20px;height:20px;border-radius:50%;border:2px solid white;"></div>` ,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -40],
    });

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
    const map = useMap();
    useEffect(() => {
        if (bounds && (bounds as any).length > 0) {
            map.fitBounds(bounds);
        }
    }, [bounds, map]);
    return null;
}

export default function MapPage() {
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        vehicleApi.get('/v1/vehicles/search', {
            params: {
                size: 1000,
                page: 0,
                sort: 'id,asc'
            }
        })
            .then(res => setVehicles(res.data.content))
            .catch(err => console.error('Failed to fetch vehicles', err));
    }, []);

    const bounds = vehicles
        .filter(v => v.pointFromLatLonDto)
        .map(v => [
            parseFloat(v.pointFromLatLonDto.latitude),
            parseFloat(v.pointFromLatLonDto.longitude),
        ]) as [number, number][];

    return (
        <div className="h-[70vh] w-full border rounded shadow overflow-hidden">
            <MapContainer center={[50.85, 4.35]} zoom={5} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {bounds.length > 0 && <FitBounds bounds={bounds} />}

                {vehicles.map((v) => {
                    const lat = parseFloat(v.pointFromLatLonDto?.latitude || '');
                    const lon = parseFloat(v.pointFromLatLonDto?.longitude || '');
                    if (isNaN(lat) || isNaN(lon)) return null;
                    const color = statusColors[v.availability] || 'blue';

                    return (
                        <Marker
                            key={v.id}
                            position={[lat, lon]}
                            icon={getIcon(color)}
                        >
                            <Popup>
                                <Link
                                    to={`/vehicle/${v.id}`}
                                    className="font-semibold text-blue-600 hover:underline block"
                                >
                                    {v.registrationNumber}
                                </Link>
                                <br />
                                Charge: {v.batteryStatus}%
                                <br />
                                State: {v.availability}
                                <br />
                                Device: {v.device?.serialNumber}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
