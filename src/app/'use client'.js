'use client'

import { useRouter } from "next/navigation";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";


import { useState, useEffect } from 'react'


export default function Home() {
  const [location, setLocation] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter();

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/location");
    response = await response.json();
    if (response.success) {
      setLocation(response.result)
    }

  }
  const loadRestaurants = async (params) => {

    let url = "http://localhost:3000/api/customer";
    if (params?.city) {
      url = url + "?city=" + params.city;
    } else if (params?.restaurantName) {
      url = url + "?restaurantName=" + params.restaurantName;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result)
    }
  }
  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ city: item })

  }
  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, [])
  // console.log(restaurants)
  return (
    <main >


      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input type="text" placeholder="Select place" value={selectedLocation} onClick={() => setShowLocation(true)} className="select-input" />
          <ul className="location-list">
            {
              showLocation && location.map((item) => (<li onClick={() => handleListItem(item)}>{item}</li>))
            }
          </ul>
          <input type="text" placeholder="Enter Food or Restaurant name" onChange={(event) => loadRestaurants({ restaurantName: event.target.value })} className="search-input" />
        </div>
      </div>
      <div className="restaurant-List-container">
        {
          restaurants.map((item) => (
            <div className="restaurant-List-child" onClick={() => router.push("explore/" + item.restaurantName + "?id=" + item._id)}>
              <img src="https://wallpaperaccess.com/full/3014596.jpg" width={280} height={200} alt="not found" />
              <div className="restaurant-detail">
                <div className="detail-1">
                  <h1><b>{item.restaurantName}</b></h1>
                  <p>Call:{item.contactNumber}</p>
                </div>
                <div className="detail-2">
                  <p className="city">{item.city}</p>
                  <p>Email:{item.email}</p>
                </div>
              </div>
            </div>))
        }
      </div>
      <Footer />
    </main>
  );
}
