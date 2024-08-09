'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserLogin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // console.log(email, password);
        if (!validateInput()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, login: true })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const responseData = await response.json();
            const { success, result } = responseData;

            if (success) {
                const { token, ...user } = result;
                localStorage.setItem("User", JSON.stringify(user));
                if (props?.redirect?.order) {
                    router.push('./order-details')
                } else {
                    router.push("/");
                }
                alert("Successfully Logged In!");
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("An error occurred while signing in:", error.message);
            setErrorMessage(error.message || "Something went wrong during login!");
        } finally {
            setLoading(false);
        }
    };

    const validateInput = () => {
        if (!email || !password) {
            setErrorMessage("Please fill in all the fields.");
            return false;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.");
            return false;
        }
        setErrorMessage(""); // Clear any previous error messages if validation passes
        return true; // Return true to indicate validation success
    };

    return (

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">User Login</h1>
            {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
            <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700">Password:</label>
                <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                />
            </div>
            <div className="mb-4">
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </div>
        </div>

    );
};

export default UserLogin;
