import { NavLink } from 'react-router';

export const Sidebar = () => {
    const base = 'block px-4 py-2 rounded hover:bg-blue-100';
    const active = 'bg-blue-200 font-semibold';

    return (
        <aside className="w-60 bg-white border-r shadow min-h-screen p-4">
            <nav className="flex flex-col gap-2">
                <NavLink to="/map" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>
                    Map
                </NavLink>
                <NavLink to="/table" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>
                    Table
                </NavLink>
                <NavLink to="/add" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>
                    Add
                </NavLink>
            </nav>
        </aside>
    );
};