
import React from 'react'
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="text-gray-600 bg-gradient-to-tl from-amber-300 via-red-200 to-red-300body-font">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <div className="logo">
                            <Image src="/deliverylogo.png" alt="not found" width={60} height={60} />
                        </div>


                        <span className="ml-3 text-xl">EatsExpress</span>
                    </a>
                    <p className="mt-2 text-sm text-gray-500">Deliciously convenient. Delivered to your doorstep.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">VEGETERIAN</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Panner-masala</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Dhosa</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Sahi-panner</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Pulao</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">NON-VEGETERIAN</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Chicken Tikka</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Hyderabadi Biryani</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Mutton</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Friedfish</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">FAST-FOODS</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Pizza</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Burger</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Magggi</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Eggrole</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SOTH-INDIAN CUISINES</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Pongal</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Masala Dosa</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Sambar</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800">Upma</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 EatsExpress —
                        <a href="https://twitter.com/knyttneve" alt="User not joined Twitter" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@ankitSrivastav</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a href="https://github.com/ankit1390023" className="text-gray-500 relative top-0.5">
                            <div><FaGithub /></div>
                        </a>
                        <a href="https://twitter.com/ASrivastav29743" alt="link-not found" className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/ankit_srivastavaa_/" className="ml-3 text-gray-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ankit-srivastav-2659b4268/" className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer