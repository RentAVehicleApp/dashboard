import { Navigate } from "react-router";
import {getUserRole} from "./utils/authUtils.ts";
import type {JSX} from "react";

export default function PrivateRoute({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) {
    const role = getUserRole();

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
}
