'use client'
import { useState } from "react";
import Footer from "../_components/Footer";
import DeliveryLogin from "../_components/DeliveryLogin";
import DeliverySignup from "../_components/DeliverySignup";
import DeliveryHeader from "../_components/DeliveryHeader";


export default function Home() {
    const [login, setLogin] = useState(true); // Use boolean value instead of string

    return (
        <div>
            <DeliveryHeader />
            <div className="flex items-center justify-center ">
                <div className="">
                    {
                        login ? <DeliveryLogin /> : <DeliverySignup />
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
