'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignUp";
import RestaurantsHeader from "../_components/RestaurantsHeader";
import Footer from "../_components/Footer";


export default function Home() {
    const [login, setLogin] = useState(true); // Use boolean value instead of string
    return (
        <div>
            <RestaurantsHeader />
            <div className="flex items-center justify-center ">
                <div className="">
                    {
                        login ? <RestaurantLogin /> : <RestaurantSignup />
                    }
                    <button className="button-link" onClick={() => setLogin(!login)}>
                        {login ? "Do not have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
            <Footer />

        </div>
    )
}
