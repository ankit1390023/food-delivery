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

    const orderNow = () => {
        if (localStorage.getItem('User')) {
            router.push('./order-details')
        } else {
            router.push('./user-auth?order=true');
        }

    }
    return (
        <div className="min-h-screen bg-gray-100 mt-5">
            <CustomerHeader cartCount={cartCount} />
            <div className="bg-gradient-to-r from-violet-200 to-pink-200 mx-auto py-8">
                <div className='flex flex-col w-full max-w-4xl mx-auto mb-8 bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6'>Shopping Cart</h2>
                    {cartStorage.length > 0 ? (
                        cartStorage.map((item) => (
                            <div className='flex flex-col sm:flex-row gap-4 mb-6 p-4 border-b border-gray-200' key={item._id}>
                                <div className='flex-shrink-0'>
                                    <img
                                        src={item.img_path}
                                        className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg shadow-md'
                                        alt='Product'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <span className='block text-lg sm:text-xl font-semibold text-gray-900'>{item.foodName}</span>
                                    <p className='text-sm sm:text-base mt-2 text-gray-700'>{item.description}</p>
                                    <div className='flex gap-4 mt-4 items-center'>
                                        <div className='flex items-center font-semibold rounded-md bg-gray-100 p-2 border border-gray-300'>
                                            <button className='mx-2 cursor-pointer text-red-500' onClick={() => changeQuantity(item._id, -1)}>-</button>
                                            <p className="text-gray-900">{item.quantity}</p>
                                            <button className='mx-2 cursor-pointer text-green-500' onClick={() => changeQuantity(item._id, 1)}>+</button>
                                        </div>
                                        <button className='rounded w-24 py-1 bg-red-600 text-white hover:bg-red-700' onClick={() => removeFromCart(item._id)}>Remove</button>
                                    </div>
                                </div>
                                <div className='text-xl font-semibold text-gray-900 ml-1'>&#8377;{item.price * item.quantity}</div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-600'>Your cart is empty.</p>
                    )}
                </div>

                {/* Order Summary */}
                <div className='w-full max-w-4xl mx-auto mb-8 bg-gradient-to-r from-amber-200 to-yellow-400 p-6 border border-gray-200 rounded-lg shadow-lg mt-8'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6'>Price Details:</h2>
                    <div className='order-detailing'>
                        <div className="row flex justify-between text-lg text-gray-700 mb-2">
                            <span>Food Charges:</span>
                            <span>&#8377;{(total - DELIVERY_CHARGES - (total - DELIVERY_CHARGES) * TAX / 100).toFixed(2)}</span>
                        </div>
                        <div className="row flex justify-between text-lg text-gray-700 mb-2">
                            <span>Tax:</span>
                            <span>&#8377;{((total - DELIVERY_CHARGES) * TAX / 100).toFixed(2)}</span>
                        </div>
                        <div className="row flex justify-between text-lg text-gray-700 mb-2">
                            <span>Delivery Charges:</span>
                            <span>&#8377;{DELIVERY_CHARGES.toFixed(2)}</span>
                        </div>
                        <div className="row flex justify-between font-bold text-xl text-gray-900 mb-2">
                            <span>Total Charges:</span>
                            <span>&#8377;{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition 
                           duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={orderNow}>
                            Order Now
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Cart;
