'use client';
import { useRouter } from "next/navigation";
import CustomerHeader from "./_components/CustomerHeader";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Footer from "./_components/Footer";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  const loadLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer/location");
      const data = await response.json();
      if (data.success) {
        setLocation(data.result);
      }
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const loadRestaurants = async (params) => {
    try {
      let url = "http://localhost:3000/api/customer";
      if (params?.city) {
        url += `?city=${params.city}`;
      } else if (params?.restaurantName) {
        url += `?restaurantName=${params.restaurantName}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setRestaurants(data.result);
      }
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ city: item });
  };

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  return (
    <main>
      <CustomerHeader />
      <div className="min-h-screen ">
        <div className='relative w-full h-64 bg-cover bg-center mb-8' style={{ backgroundImage: "url('https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center'>
            <h1 className='text-4xl font-bold mb-2'>Welcome to EatsExpress</h1>
            <p className='text-lg'>Enjoy our delicious food delivered to your door</p>
          </div>
        </div>
        <div className="text-5xl font-extrabold">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center font-serif hover:font-mono mb-12">Explore your fav food</h1>
        </div>
        <div className="flex flex-col md:flex-row-reverse mx-auto justify-between p-2.5 my-11">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/img6.jpeg"
              alt="Image not found"
              className="rounded-full border-2 object-cover transition duration-300 ease-in-out hover:shadow-grey-600 hover:scale-105 shadow-lg"
              layout="responsive"
              width={1220}
              height={800}
            />
          </div>
          <div className="md:w-1/2 p-10">
            <h1 className="text-3xl font-bold">Deliciously convenient. Delivered to your doorstep.</h1>
            <p className="leading-6 mt-4">
              "At EatsExpress, we're passionate about good food and exceptional service. Our app connects you with the best local eateries, allowing you to discover hidden gems and popular favorites alike. Whether you're planning a cozy night in or hosting a gathering, our food delivery service caters to your cravings with a diverse range of cuisines and flavors. Join us on a culinary journey made simple."
            </p>
          </div>
        </div>
        <div className="flex flex-col p-12 md:p-32 md:flex-row">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Select place"
              value={selectedLocation}
              onClick={() => setShowLocation(true)}
              className="w-full p-3 border rounded-lg drop-shadow-xl focus:outline-none transition duration-300 ease-in hover:border-gray-600"
            />
            {showLocation && (
              <ul className="mt-2 border rounded-lg shadow-md bg-white">
                {location.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleListItem(item)}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full md:w-2/3 md:ml-4">
            <input
              type="text"
              placeholder="Enter Food or Restaurant name"
              onChange={(event) => loadRestaurants({ restaurantName: event.target.value })}
              className="w-full p-3 border drop-shadow-xl rounded-lg focus:outline-none transition duration-300 ease-in hover:border-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in hover:scale-95 cursor-pointer mb-6"
              onClick={() => router.push(`/explore/${item.restaurantName}?id=${item._id}`)}
            >
              <img
                src="https://wallpaperaccess.com/full/3014596.jpg"
                className="w-full h-48 object-cover transition-transform duration-300 ease-in transform hover:scale-110"
                alt="Restaurant"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.restaurantName}</h2>
                <p className="text-sm text-gray-600">Call: {item.contactNumber}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">{item.city}</p>
                  <p className="text-sm text-gray-600">Email: {item.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
