import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useVehicleStore } from "../store/vehicleStore";

export default function TablePage() {
    const { vehicles, loading, error, fetchVehicles, page, totalPages } = useVehicleStore();
    const [currentPage, setCurrentPage] = useState(0);
    const size = 5;

    useEffect(() => {
        fetchVehicles(currentPage, size);
    }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage((p) => p - 1);
    };

    if (loading) return <div className="p-4 text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="p-4 text-center text-lg text-red-500">Error: {error}</div>;

    return (
        <div className="overflow-x-auto bg-gray-50 p-4">
            <table className="min-w-full border text-sm bg-white rounded shadow">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">Reg. number</th>
                    <th className="px-4 py-2">Vehicle Model</th>
                    <th className="px-4 py-2">Availability</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Vehicle Nodes</th>
                    <th className="px-4 py-2">Device Serial</th>
                    <th className="px-4 py-2">Device Model</th>
                    <th className="px-4 py-2">Device Nodes</th>
                    <th className="px-4 py-2">Device Config</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.registrationNumber} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2 text-blue-600">
                            <Link to={`/vehicle/${vehicle.registrationNumber}`} className="hover:underline">
                                {vehicle.registrationNumber}
                            </Link>
                        </td>
                        <td className="px-4 py-2">{vehicle.vehicleModel}</td>
                        <td className="px-4 py-2">{vehicle.availibility}</td>
                        <td className="px-4 py-2">
                            {vehicle.point ? `${vehicle.point.x}, ${vehicle.point.y}` : 'No position'}
                        </td>
                        <td className="px-4 py-2">{vehicle.nodes}</td>
                        <td className="px-4 py-2">{vehicle.device.serialNumber}</td>
                        <td className="px-4 py-2">{vehicle.device.deviceModel}</td>
                        <td className="px-4 py-2">{vehicle.device.nodes}</td>
                        <td className="px-4 py-2">{vehicle.device.deviceConfig.name}</td>
                        <td className="px-4 py-2">
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                Block
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
