'use client';
import React, { useEffect, useState } from 'react';
import CustomerHeader from '@/app/_components/CustomerHeader';
import Footer from '../_components/Footer';
import { DELIVERY_CHARGES, TAX } from '../../../lib/constant';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const [total, setTotal] = useState(0);
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('User')) || []);
    const router = useRouter();
    const [removeCartData, setRemoveCartData] = useState(false);

    useEffect(() => {
        // Fetch or calculate the total amount (example logic)
        const calculatedTotal = 1000; // Replace with actual logic to fetch or calculate total
        setTotal(calculatedTotal);
    }, []);
    // useEffect(() => {
    // if (!total) {
    // router.push('/');
    // }
    // }, [total])
    const foodCharges = total - DELIVERY_CHARGES - (total - DELIVERY_CHARGES) * TAX / 100;
    const tax = (total - DELIVERY_CHARGES) * TAX / 100;

    useEffect(() => {
        const carNumber = JSON.parse(localStorage.getItem('cart'));
        if (!carNumber) {
            router.push('./myProfile')
        }
    }, [])
    const placeYourOrder = async () => {
        const user_Id = JSON.parse(localStorage.getItem('User'))?._id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let resto_Id = cart[0]?.resto_id;

        let foodItemIds = cart?.map((item) => item._id).toString();
        let deliveryBoy_Id = '66518a04fce79e93f7836b66';
        let status = 'confirmed';
        let amount = total.toFixed(2);
        const collection = {
            user_Id,
            resto_Id,
            foodItemIds,
            deliveryBoy_Id,
            status,
            amount,
        }
        let response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            body: JSON.stringify(collection)
        })
        console.log(collection);
        response = await response.json();
        console.log(response);
        if (response.success) {
            setRemoveCartData(true);
            alert('Order Confirmed');
        } else {
            alert('Order failed');
        }

    }
    return (
        <div className="min-h-screen  mt-5">
            <CustomerHeader removeCartData={removeCartData} /> {/* Include the CustomerHeader component */}
            <div className="bg-gradient-to-r from-violet-200 to-pink-200 mx-auto p-4">
                <div className='flex flex-col w-full max-w-4xl mx-auto  p-6 border border-gray-200 rounded-lg shadow-xl'>
                    <h2 className='text-4xl text-Orange font-bold text-gray-900 mb-6 text-center'>Order Summary</h2>
                    <div className='w-full bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg mt-8'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-6'>Deliver to:</h2>
                        <div className='order-detailing'>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Name:</span>
                                <span>{userStorage.name}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>City:</span>
                                <span>{userStorage.city}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Address:</span>
                                <span>{userStorage.address}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Email:</span>
                                <span>{userStorage.email}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Contact:</span>
                                <span>{userStorage.contact}</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg mt-8'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-6'>Price Details:</h2>
                        <div className='order-detailing'>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Food Charges:</span>
                                <span>&#8377;{foodCharges.toFixed(2)}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Tax:</span>
                                <span>&#8377;{tax.toFixed(2)}</span>
                            </div>
                            <div className="row flex justify-between text-lg text-gray-700 mb-2">
                                <span className='font-semibold'>Delivery Charges:</span>
                                <span>&#8377;{DELIVERY_CHARGES.toFixed(2)}</span>
                            </div>
                            <div className="row flex justify-between font-bold text-xl text-gray-900 mb-2">
                                <span>Total Charges:</span>
                                <span>&#8377;{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition 
                            duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={placeYourOrder}>
                            Place Your Order
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
