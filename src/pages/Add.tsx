import CreateConfigForm from '../components/forms/CreateConfigForm';
import CreateDeviceForm from '../components/forms/CreateDeviceForm';
import CreateVehicleForm from '../components/forms/CreateVehicleForm';

export default function AddPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
            <div className="w-full max-w-md space-y-6">
                <CreateConfigForm />
                <CreateDeviceForm />
                <CreateVehicleForm />
            </div>
        </div>
    );
}