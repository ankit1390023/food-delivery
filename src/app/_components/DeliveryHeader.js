'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const DeliveryHeader = (props) => {
    const [delivery, setDelivery] = useState(undefined);
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    console.log(props);

    const logOut = () => {
        localStorage.removeItem("deliveryPartner");
        setUser(undefined);
        router.push("/deliveryPartner-auth");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='flex md:flex-row w-full items-center justify-between bg-slate-100 p-3'>
            {/* Logo Section on the Left */}
            <div className='flex items-center p-2 md:p-0'>
                <Image src="/deliverylogo.png" alt="not found" width={60} height={60} />
                <span className='mx-3 font-bold text-xl'>EatsExpress</span>
            </div>

            {/* Toggle Button on the Right */}
            <div className='md:hidden'>
                <button onClick={toggleMenu} className="text-2xl">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Navigation Menu */}
            <ul className={`fixed top-0 right-0 h-full z-50 mt-20 bg-slate-100 transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 flex-col md:flex-row md:w-auto items-center gap-5 p-5 md:p-0 list-none md:flex`}>
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                    <Link href="/">Home</Link>
                </li>
                {delivery ? (
                    <>
                        <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                            <Link href="/myProfile">{user.name}</Link>
                        </li>
                        <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                            <button onClick={logOut}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                        <Link href="/deliveryPartner-auth">Login</Link>
                    </li>
                )}
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                    <Link href="./restaurant/dashboard">Add restaurant</Link>
                </li>
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                    <Link href="/deliveryPartner">Delivery Partner</Link>
                </li>

            </ul>
        </div>
    );
}

export default DeliveryHeader;
