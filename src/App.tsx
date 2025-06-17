import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import MapPage from './pages/Map.tsx';
import TablePage from './pages/Table';
import AddPage from './pages/Add';
import './index.css';
import VehicleCard from "./pages/VehicleCard.tsx";

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
                <Sidebar/>
                <div className="flex-1">
                    <Header/>
                    <main className="p-4 max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Navigate to="/map" replace/>}/>
                            <Route path="/map" element={<MapPage/>}/>
                            <Route path="/table" element={<TablePage/>}/>
                            <Route path="/add" element={<AddPage/>}/>
                            <Route path="/vehicle/:id" element={<VehicleCard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}