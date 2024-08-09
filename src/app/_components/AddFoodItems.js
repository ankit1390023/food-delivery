'use client'


import React, { useState } from 'react';

const AddFoodItems = (props) => {

    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [img_path, setImgPath] = useState(""); // Corrected state variable name
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const handleAddFoodItems = async () => {
        if (!validateInputs()) {
            return;
        }
        setLoading(true);
        // console.log(foodName, price, img_path, description)
        try {
            let resto_id;
            const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'))
            if (restaurantData) {
                resto_id = restaurantData;
            }
            let response = await fetch("http://localhost:3000/api/restaurant/foods", { method: "POST", body: JSON.stringify({ foodName, price, img_path, description, resto_id }) });
            response = await response.json();
            console.log(response);
            if (response.success) {
                alert("Successfully!Items are added ")
                props.setAddItems(false);
                setFoodName("");
                setPrice("");
                setImgPath("");
                setDescription("");

            } else {
                alert("Items are not added")
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occured while adding items!")
        }
        finally {
            setLoading(false)
        }

    }
    const validateInputs = () => {
        if (!foodName || !price || !img_path || !description) {
            setErrorMessage("All fields are required");
            return false;
            //it means yhi se laut jao ,age api call ho hi n
        }
        setErrorMessage(" ")
        return true;
    }
    return (
        <div className="container">
            <div>
                <h1> Add Food Items </h1>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {/*it means if errorMessage h to ye show ho*/}

                <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Name' value={foodName} onChange={(e) => setFoodName(e.target.value)} /></div>
                <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Price' value={price} onChange={(e) => setPrice(e.target.value)} /></div>

                <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Path' value={img_path} onChange={(e) => setImgPath(e.target.value)} /></div>

                <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Description' value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div className='input-wrapper'><button onClick={handleAddFoodItems}>Add Food Items</button></div>


            </div>
        </div>
    );
}

export default AddFoodItems;
