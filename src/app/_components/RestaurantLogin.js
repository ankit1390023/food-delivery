import { useState } from "react";
import { useRouter } from 'next/navigation';

const RestaurantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                body: JSON.stringify({ email, password, login: true }),
                headers: { "Content-Type": "application/json" }
            });
            const responseData = await response.json();
            if (responseData.success) {
                const { result } = responseData;
                delete result.password;
                localStorage.setItem("restaurantUser", JSON.stringify(result));
                router.push("/restaurant/dashboard");
                alert("Successfully logged In");
            } else {
                setErrorMessage("Please enter valid details");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Please SignUp first");
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        if (!email || !password) {
            setErrorMessage("Please enter all fields.");
            return false;
        } else if (email.length < 8) {
            setErrorMessage("Please enter a valid email address.");
            return false;
        } else if (password.length < 6) {
            setErrorMessage("Please enter a stronger password.");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    return (

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Restaurant Login</h1>
            {errorMessage && <p className="text-red-600 text-sm mb-4 text-center">{errorMessage}</p>}
            <div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
                        disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default RestaurantLogin;
