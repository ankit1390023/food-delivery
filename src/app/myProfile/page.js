'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const MyProfile = () => {
    const [orders, setOrder] = useState([]);

    const orderDetails = async () => {
        try {

            const user_Id = JSON.parse(localStorage.getItem('User'))._id;
            let response = await fetch(`http://localhost:3000/api/orders?id=${user_Id}`);
            response = await response.json();
            console.log(response);
            if (response.success) {
                setOrder(response.restoData);
                // alert("Previous Orders Loaded Successfully");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    useEffect(() => {
        orderDetails();
    }, []);
    console.log(orders);

    return (
        <div className="bg-gradient-to-r from-violet-200 to-pink-200 min-h-screen p-4">
            <CustomerHeader />
            <div className="flex flex-col max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-xl mt-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Previous Orders</h2>
                <div className="w-full bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg mt-8">

                    {orders.length > 0 ? (
                        orders.map((item, index) => (
                            <div key={index} className="border-t-[1px] border-red-400 p-2">
                                {item.data ? (
                                    <>

                                        <div className="flex flex-wrap justify-between space-y-1">
                                            <span className="text-md font-extrabold mb-1">RestaurantName:</span>
                                            <span className="text-md font-extrabold mb-1">{item.data.restaurantName}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between space-y-1">
                                            <span className="text-md font-semibold">City:</span>
                                            <span>{item.data.city}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between space-y-1">
                                            <span className="text-md font-semibold">Address:</span>
                                            <span>{item.data.address}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between space-y-1">
                                            <span className="text-md font-semibold">RestaurantEmail:</span>
                                            <span>{item.data.email}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-red-500">Order details are missing.</div>
                                )}
                                <div className="flex flex-wrap justify-between space-y-1">
                                    <span className="text-md font-semibold">Amount:</span>
                                    <span>{item.amount}</span>
                                </div>
                                <div className="flex flex-wrap justify-between space-y-1">
                                    <span className="text-md font-semibold">Status:</span>
                                    <span>{item.status}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">No previous orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyProfile;
