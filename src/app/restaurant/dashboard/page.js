'use client'
import RestaurantsHeader from '@/app/_components/RestaurantsHeader';
import React, { useState } from 'react';
import AddFoodItems from '@/app/_components/AddFoodItems';
import FoodItemList from '@/app/_components/FoodItemList';

const Dashboard = () => {
    const [addItems, setAddItems] = useState(false);

    return (
        <div className="bg-gray-100 min-h-screen">
            <RestaurantsHeader />

            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setAddItems(true)} className="bg-blue-500 hover:bg-blue-600 mx-6 text-white font-semibold px-4 py-2 rounded">
                        Add Items
                    </button>
                    <button onClick={() => setAddItems(false)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                        Dashboard
                    </button>
                </div>
                {addItems ? <AddFoodItems setAddItems={setAddItems} /> : <FoodItemList />}
            </div>
        </div>
    );
};

export default Dashboard;
