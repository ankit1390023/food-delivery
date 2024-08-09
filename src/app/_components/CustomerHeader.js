'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const CustomerHeader = (props) => {
    const [user, setUser] = useState(undefined);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    console.log(props);

    useEffect(() => {
        const userData = localStorage.getItem("User");
        setUser(userData ? JSON.parse(userData) ?? undefined : undefined);

        const cartStorage = localStorage.getItem('cart');
        const cartData = cartStorage ? JSON.parse(cartStorage) ?? [] : [];
        setCartItem(cartData);
        setCartNumber(cartData.length);
    }, []);

    useEffect(() => {
        if (props.cartData) {
            const existingItem = cartItem.find(item => item._id === props.cartData._id);
            if (!existingItem) {
                const updatedCart = [...cartItem, props.cartData];
                setCartItem(updatedCart);
                setCartNumber(updatedCart.length);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            const updatedCart = cartItem.filter(item => item._id !== props.removeCartData);
            setCartItem(updatedCart);
            setCartNumber(updatedCart.length);
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            if (updatedCart.length === 0) {
                localStorage.removeItem('cart');
            }
        }
    }, [props.removeCartData]);

    useEffect(() => {
        if (props.cartCount !== undefined) {
            setCartNumber(props.cartCount);
        }
    }, [props.cartCount]);

    const logOut = () => {
        localStorage.removeItem("User");
        setUser(undefined);
        router.push("/user-auth"); // Navigate to user-auth page after logout
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
                {user ? (
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
                        <Link href="/user-auth">Login</Link>
                    </li>
                )}
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                    <Link href="./restaurant/dashboard">Add restaurant</Link>
                </li>
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105 hover:underline hover:underline-offset-1'>
                    <Link href="/deliveryPartner">Delivery Partner</Link>
                </li>
                <li className='mt-[8px] sm:relative bottom-[44px] transition duration-300 ease-in hover:scale-105'>
                    <Link href={cartNumber ? "/cart" : "#"}>
                        <div className='relative'>
                            <span className='text-2xl'><FaCartArrowDown /></span>
                            <span className='absolute bottom-4 left-5 font-medium text-xs text-white bg-red-600 rounded-full h-4 w-4 flex items-center justify-center'>
                                {cartNumber}
                            </span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CustomerHeader;
