import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FoodItemList = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const [restaurantId, setRestaurantId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restaurantData && restaurantData._id) {
            setRestaurantId(restaurantData._id);
        } else {
            alert("Restaurant ID not found in local storage!");
        }
    }, []);

    useEffect(() => {
        if (restaurantId) {
            loadFoodItems(restaurantId);
        }
    }, [restaurantId]);

    const loadFoodItems = async (resto_id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
            response = await response.json();

            if (response.success) {
                setFoodItems(response.result);
            } else {
                throw new Error("Error while loading the data!");
            }
        } catch (error) {
            console.error(error);
            alert("Error while loading the data!");
        }
    }

    const DeleteFoodItemList = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
                method: 'DELETE'
            });
            response = await response.json();
            if (response.success) {
                loadFoodItems(restaurantId);
                alert("Items deleted Successfully!");
            } else {
                throw new Error("Failed to delete Items!");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete Items!");
        }
    }

    return (
        <div>
            <h1>Food Item List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>img_path</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.foodName}</td>
                                <td>{item.price}</td>
                                <td><img src={item.img_path} alt="image not found" width="50" height="50" /></td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => router.push("/restaurant/dashboard/" + item._id)}>Edit</button>
                                    <button onClick={() => DeleteFoodItemList(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FoodItemList;
