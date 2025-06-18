import axios from "axios";
import { useEffect, useState } from "react";
import CreateDeviceForm from "../components/forms/CreateDeviceForm.tsx";
import CreateConfigForm from "../components/forms/CreateConfigForm.tsx";
import CreateVehicleForm from "../components/forms/CreateVehicleForm.tsx";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AddPage() {
    const [deviceConfigs, setDeviceConfigs] = useState([]);
    const [devices, setDevices] = useState([]);

    async function loadData() {
        try {
            const [confRes, devRes] = await Promise.all([
                axios.get(`${API_BASE}/v1/deviceconfig/list?page=0&size=1000`),
                axios.get(`${API_BASE}/v1/devices/list?page=0&size=1000`),
            ]);
            setDeviceConfigs(confRes.data.content);
            setDevices(devRes.data.content);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="space-y-6">
            <CreateConfigForm onCreated={loadData} />
            <CreateDeviceForm configs={deviceConfigs} onCreated={loadData} />
            <CreateVehicleForm devices={devices} onCreated={loadData} />
        </div>
    );
}
