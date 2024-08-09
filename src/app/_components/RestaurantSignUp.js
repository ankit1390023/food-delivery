import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RestaurantSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (!validateInputs()) {
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                body: JSON.stringify({ email, password, city, address, contactNumber, restaurantName }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();
            if (responseData.success) {
                const { result } = responseData;
                delete result.password;
                localStorage.setItem("restaurantUser", JSON.stringify(result));
                router.push("/restaurant/dashboard");
                alert("Welcome! You are signed up");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while signing up");
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        if (!email || !password || !confirmPassword || !restaurantName || !city || !address || !contactNumber) {
            setErrorMessage("All fields are required");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Restaurant SignUp</h1>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                <div>
                    <div className="mb-4">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" type="text" placeholder="Enter email" />
                    </div>
                    <div className="mb-4">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" type="password" placeholder="Enter password" />
                    </div>
                    <div className="mb-4">
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" type="password" placeholder="Confirm password" />
                    </div>
                    <div className="mb-4">
                        <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="input-field" type="text" placeholder="Enter restaurant name" />
                    </div>
                    <div className="mb-4">
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="input-field" type="text" placeholder="Enter city" />
                    </div>
                    <div className="mb-4">
                        <input value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" type="text" placeholder="Enter full address" />
                    </div>
                    <div className="mb-4">
                        <input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="input-field" type="text" placeholder="Enter contact number" />
                    </div>
                    <div className="mb-4">
                        <button onClick={handleSignup} className="input-field w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantSignup;
