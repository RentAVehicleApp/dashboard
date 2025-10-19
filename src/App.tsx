import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import MapPage from './vehicles/pages/Map.tsx';
import './index.css';
import VehicleCard from "./vehicles/pages/VehicleCard.tsx";

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { ToastContainer } from "react-toastify";
import {Customers} from "./components/users/pages/Customers.tsx";
import {CustomerCard} from "./components/users/pages/CustomerCard.tsx";
import {Workers} from "./components/workers/  pages/supporters/Workers.tsx";
import WorkerDetails from "./components/workers/  pages/supporters/WorkerDetails.tsx";
import {Tickets} from "./components/workers/  pages/tickets/Tickets.tsx";
import {TicketDetails} from "./components/workers/  pages/tickets/TicketDetails.tsx";
import VehicleTable from "./vehicles/pages/VehicleTable.tsx";



delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function App() {
    return (
        <Router>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                    <Header />
                    <main className="p-4 max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Navigate to="/map" replace />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/table" element={<VehicleTable />} />
                            <Route path="/vehicle/:id" element={<VehicleCard />} />

                            {/* Users */}
                            <Route path="/users" element={<Customers />} />
                            <Route path="/users/:id" element={<CustomerCard />} />

                            {/* Workers */}
                            <Route path="/workers" element={<Workers />} />
                            <Route path="/workers/:id" element={<WorkerDetails />} />

                            {/* Tickets */}
                            <Route path="/tickets" element={<Tickets />} />
                            <Route path="/tickets/:id" element={<TicketDetails />} />
                        </Routes>

                        <ToastContainer position="top-right" autoClose={3000} />
                    </main>
                </div>
            </div>
        </Router>
    );
}
