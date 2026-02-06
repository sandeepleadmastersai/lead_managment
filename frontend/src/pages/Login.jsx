import { useState } from "react";
import {API} from "../api/axios.js";

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token); // store JWT
            onLogin(); // update parent state to logged in
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-6 border rounded">
                <h2 className="text-xl mb-4">Admin Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
}