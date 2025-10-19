import { useNavigate } from "react-router";
import {logout} from "../utils/authUtils.ts";

export const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="flex justify-between items-center p-4 shadow">
            <h1 className="text-xl font-bold">RentAVehicle Support</h1>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
        </header>
    );
};
