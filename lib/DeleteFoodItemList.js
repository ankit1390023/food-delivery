import React from 'react';
import { useRouter } from 'next/navigation';

const DeleteFoodItemList = (props) => {
    const router = useRouter();

    const deleteRecord = async () => {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this item?");
            if (!confirmDelete) return;

            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${props.id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            response = await response.json();
            console.log(response);
            if (response.success) {
                alert("Item deleted successfully");
                router.push("/restaurant/dashboard");
            } else {
                throw new Error('Failed to delete item');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to delete item');
        }
    }

    return (
        <div>
            <button onClick={deleteRecord}>Delete</button>
        </div>
    );
}

export default DeleteFoodItemList;
