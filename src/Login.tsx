import { useState } from "react";
import { useNavigate } from "react-router";
import {login} from "./components/api/authApi.ts";
import {setAuthUser} from "./utils/authUtils.ts";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(form);
            setAuthUser(user);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
    {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
    <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="border w-full p-2"
        />
        <input
            type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border w-full p-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
            </button>
            </form>
            </div>
    );
    }
