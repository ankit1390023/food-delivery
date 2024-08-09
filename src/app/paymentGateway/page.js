'use client';
import React, { useEffect, useState } from 'react';
import CustomerHeader from '@/app/_components/CustomerHeader';
import Footer from '../_components/Footer';
import { DELIVERY_CHARGES, TAX } from '../../../lib/constant';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = storedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartStorage(updatedCart);
        calculateTotal(updatedCart);
        calculateCartCount(updatedCart);
    }, []);

    const updateCartStorage = (updatedCart) => {
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        calculateCartCount(updatedCart);
    };

    const calculateTotal = (cart) => {
        const subtotal = cart.reduce((accum, item) => accum + item.price * item.quantity, 0);
        const taxAmount = subtotal * TAX / 100;
        const totalAmount = subtotal + DELIVERY_CHARGES + taxAmount;
        setTotal(totalAmount);
    };

    const calculateCartCount = (cart) => {
        const count = cart.reduce((accum, item) => accum + item.quantity, 0);
        setCartCount(count);
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartStorage.filter(item => item._id !== itemId);
        updateCartStorage(updatedCart);
    };

    const changeQuantity = (itemId, increment) => {
        const updatedCart = cartStorage.map(item => {
            if (item._id === itemId) {
                const newQuantity = item.quantity + increment;
                return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
            }
            return item;
        });
        updateCartStorage(updatedCart);
    };

    useEffect(() => {
        localStorage.setItem("cartCount", cartCount);
    }, [cartCount]);

    return (
        <div className="min-h-screen bg-gray-100 mt-5">
            <CustomerHeader cartCount={cartCount} />
            <div className="bg-gradient-to-r from-violet-200 to-pink-200 mx-auto py-8">
                <div className='w-full max-w-4xl mx-auto
                  bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg mt-8'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6'>Additional Charges and Order Options</h2>
                    <p className='text-gray-700 mb-4'>Charges Applied on Products:</p>
                    <ul className='list-disc pl-6 text-gray-700 mb-4'>
                        <li>Base Price: $X.XX</li>
                        <li>Extra Toppings: $X.XX each</li>
                    </ul>
                    <p className='text-gray-700 mb-4'>Order Options:</p>
                    <ul className='list-disc pl-6 text-gray-700'>
                        <li>Dine-In</li>
                        <li>Takeout</li>
                    </ul>
                </div>

                <div className='w-full max-w-4xl bg-gradient-to-r from-amber-200 to-yellow-400 mx-auto p-6 border border-gray-200 rounded-lg shadow-lg mt-8'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6'>Payment Details</h2>
                    <div className='flex flex-col space-y-4'>
                        <input type='text' placeholder='Card Number' className='border border-gray-300 p-2 rounded-lg' />
                        <div className='flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4'>
                            <input type='text' placeholder='Expiration Date' className='border border-gray-300 p-2 rounded-lg flex-1' />
                            <input type='text' placeholder='CVV' className='border border-gray-300 p-2 rounded-lg flex-1' />
                        </div>
                        <input type='text' placeholder='Account Holder Name' className='border border-gray-300 p-2 rounded-lg' />
                        <input type='text' placeholder='Billing Address' className='border border-gray-300 p-2 rounded-lg' />
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button className="bg-green-500 text-white px-6 py-3 md:w-224 rounded-lg font-semibold hover:bg-green-600">Place Your Order</button>
                </div>

                <div className='w-full max-w-4xl mx-auto bg-gradient-to-r from-amber-200 to-yellow-400
 p-4 border border-gray-200 rounded-lg shadow-md mt-8'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Download Bill Receipt</h2>
                    <p className='text-gray-600'>Click the button below to download your bill receipt.</p>
                    <div className='flex justify-center mt-4'>
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600">Download Receipt</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
