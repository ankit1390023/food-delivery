'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Corrected import

const RestaurantsHeader = () => {
    const [details, setDetails] = useState(null);
    const router = useRouter();
    const pathName = usePathname();

    const logout = () => {
        localStorage.removeItem("restaurantUser");
        router.push('/restaurant');
    }

    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        if (!data && pathName == "/restaurant/dashboard") {
            router.push("/restaurant");
        } else if (data && pathName == "/restaurant") {
            router.push("/restaurant/dashboard");
        } else {
            setDetails(JSON.parse(data));
        }
    }, [pathName, router]);

    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image src="/deliverylogo.png" alt="Logo" width={50} height={50} className="rounded-full" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Restaurant</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                {details && details.restaurantName ? (
                    <>
                        <button onClick={logout} className="text-gray-700 hover:text-red-500">Logout</button>
                        <Link href="/" className="text-gray-700 hover:text-blue-500">Profile</Link>
                    </>
                ) : (
                    <Link href="/restaurant" className="text-gray-700 hover:text-blue-500">Login/Signup</Link>
                )}
            </nav>
            <div className="md:hidden flex items-center">


                <button className="text-gray-700 hover:text-blue-500 focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>


                <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Home</Link>
                    {details && details.restaurantName ? (
                        <>
                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                            <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
                        </>
                    ) : (
                        <Link href="/restaurant" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Login/Signup</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default RestaurantsHeader;
