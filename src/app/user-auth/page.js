'use client'
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer';
import UserLogin from '../_components/UserLogin';
import UserSignUp from '../_components/UserSignUp';

const page = (props) => {
    console.log('order flag', props.searchParams);
    const [login, setlogin] = useState(true);

    return (
        <div>
            <CustomerHeader />
            <div className="min-h-[60vh] sm:min-h-screen flex items-center justify-center flex-col ">
                <div className="rounded-md m-4">
                    <div>
                        {
                            login ? <UserLogin redirect={props.searchParams} /> : <UserSignUp redirect={props.searchParams} />
                        }
                        <button className='button-link' onClick={() => setlogin(!login)}>{login ? "Do not have an account ? SignedUp" :
                            "Already have an accout?login"}</button>
                    </div>
                    <div>

                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default page



















