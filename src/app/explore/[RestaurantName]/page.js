'use client';

import React, { useEffect, useState } from 'react';
import CustomerHeader from '@/app/_components/CustomerHeader';
import Footer from '@/app/_components/Footer';

const Page = (props) => {
    // console.log(props);
    const RestoName = decodeURI(props.params.RestaurantName);
    // console.log(RestoName);
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [foodDetails, setFoodDetails] = useState([]);

    const [cartData, setCartData] = useState(null);
    const [removeCartData, setRemoveCartData] = useState(null);

    const [cardIds, setCardIds] = useState([]);

    useEffect(() => {
        const storedCartIds = JSON.parse(localStorage.getItem('cart')) || [];
        setCardIds(storedCartIds);
    }, []);

    // console.log(cardIds);

    const loadFoodDetails = async () => {
        const resto_id = props.searchParams.id;
        // console.log(resto_id);
        try {
            let response = await fetch(`http://localhost:3000/api/customer/${resto_id}`);
            response = await response.json();
            if (response.success) {
                setFoodDetails(response.result.FoodData);
                setRestaurantDetails(response.result.restaurantData);
            }
        } catch (error) {
            console.error("Error fetching food details:", error);
        }
    };

    const addToCart = async (item) => {
        let response = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            body: JSON.stringify({
                foodName: item.foodName,
                price: item.price,
                img_path: item.img_path,
                description: item.description,
                quatity: 1,
                resto_id: item.resto_id,

            })
        });

        setCartData(item);
        let localCartIds = [...cardIds, item._id];
        setCardIds(localCartIds);
        localStorage.setItem('cart', JSON.stringify(localCartIds));
        setRemoveCartData(null);
    };

    const removeToCart = (id) => {
        setRemoveCartData(id);
        const localCardIds = cardIds.filter((cardId) => cardId !== id);
        setCardIds(localCardIds);
        localStorage.setItem('cart', JSON.stringify(localCardIds));
        setCartData(null);
    };

    useEffect(() => {
        loadFoodDetails();
    }, [props.searchParams.id]);

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

            {/* hero section */}
            <div className='relative w-full h-80 bg-cover bg-center mb-12' style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/sushi-roll-with-salmon-cream-cheese-black_135427-4741.jpg?w=900')" }}>
                <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70'></div>
                <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4'>
                    <h1 className='text-5xl md:text-6xl font-bold mb-4'>{RestoName}</h1>
                    <p className='text-lg md:text-2xl mb-6'>Enjoy our delicious food delivered to your door</p>

                </div>
            </div>

            <div className='max-w-4xl mx-auto px-4'>


                {/* restaurant details section */}
                <div className='mt-12'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-6'>Restaurant Details</h2>
                    <div className='bg-white p-6 border border-gray-200 rounded-lg shadow-md'>
                        {restaurantDetails.length > 0 ? restaurantDetails.map((item, index) => (
                            <div key={index}>
                                <p className='text-lg'><strong>Restaurant:</strong> {item.restaurantName}</p>
                                <p className='text-lg'><strong>City:</strong> {item.city}</p>
                                <p className='text-lg'><strong>Email:</strong> {item.email}</p>
                            </div>
                        )) : <p className='text-gray-600'>Loading restaurant details...</p>}
                    </div>
                </div>

                {/* food section */}
                <div className='mt-12'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-6'>Food Menu</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {foodDetails.map((item, index) => (
                            <div key={index} className='bg-white p-6 border border-gray-200 rounded-lg shadow-md'>
                                <img className="w-full h-48 object-cover rounded-lg mb-4" src={item.img_path} alt="Food" />
                                <h3 className='text-xl font-bold mb-2'>{item.foodName}</h3>
                                <p className='text-gray-700 mb-4'>{item.description}</p>
                                <div className='flex justify-between items-center'>
                                    <span className='text-lg font-semibold text-gray-800'>&#8377;{item.price}</span>
                                    {cardIds.includes(item._id) ? (
                                        <button onClick={() => removeToCart(item._id)} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300'>Remove from Cart</button>
                                    ) : (
                                        <button onClick={() => addToCart(item)} className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300'>Add to Cart</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
