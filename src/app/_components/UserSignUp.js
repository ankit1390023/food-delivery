'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserSignUp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        if (!validateInputs()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                body: JSON.stringify({ name, email, password, city, address, contact })
            });

            const responseData = await response.json();
            // console.log(responseData)
            if (responseData.success) {
                const { result } = responseData;
                delete result.password;

                localStorage.setItem("User", JSON.stringify(result));
                if (props?.redirect?.order) {
                    router.push('./order-details')
                } else {
                    router.push("/");
                }
                alert("Successfully signed up!");
            } else {
                setErrorMessage(responseData.message || "Sign up failed. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred while signing up:", error);
            setErrorMessage("An error occurred while signing up");
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        if (!name || !email || !password || !confirmPassword || !city || !address || !contact) {
            setErrorMessage("All fields are required");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">User Sign Up</h1>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Confirm Password"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter city"
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter address"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        placeholder="Enter contact number"
                        onChange={(event) => setContact(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded"
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSignUp;
