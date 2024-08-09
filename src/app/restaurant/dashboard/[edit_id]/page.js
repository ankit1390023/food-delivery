'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditFoodItems = (props) => {
    const food_id = props.params.edit_id;
    console.log(food_id);
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [img_path, setImgPath] = useState(""); // Corrected state variable name
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter();
    useEffect(() => {
        handleLoadFoodItems();
    }, [])
    const handleLoadFoodItems = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + food_id)
            response = await response.json();
            // console.log(response);
            if (response.success) {
                setFoodName(response.result.foodName);
                setPrice(response.result.price);
                setImgPath(response.result.img_path);
                setDescription(response.result.description);
            } else {
                alert("Items are not Eed")
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occured while Eing items!")
        }
    }
    const handleEditFoodItems = async () => {
        if (!foodName || !price || !img_path || !description) {
            setErrorMessage("All fields must be filled out!");
            return;
        }
        try {
            let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + food_id, { method: "PUT", body: JSON.stringify({ foodName, price, img_path, description }) })
            response = await response.json();
            // console.log(respomnse);
            if (response.success) {
                setErrorMessage("SuccessFully  Edited!");
                // setTimeout(() => {
                // window.location.reload()
                // }, 1000)
                setTimeout(() => { setErrorMessage("") }, 5000);
                // router.push("/restaurant/dashboard");
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Update FoodItems</h1>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {/*it means if errorMessage h to ye show ho*/}
                <div className='system'> <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Name' value={foodName} onChange={(e) => setFoodName(e.target.value)} /></div>
                    <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Price' value={price} onChange={(e) => setPrice(e.target.value)} /></div>

                    <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Path' value={img_path} onChange={(e) => setImgPath(e.target.value)} /></div>

                    <div className='input-wrapper'><input className="input-field" type="text" placeholder='Enter Food Description' value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                    <div className='input-wrapper'><button className="button" onClick={handleEditFoodItems}>Update</button></div>
                    <div className='input-wrapper'><button className="button" onClick={() => router.push("../dashboard")}>Back</button></div></div>

            </div>
        </div>
    );
}
export default EditFoodItems;
