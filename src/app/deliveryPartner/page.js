'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader';

const page = () => {
    const router = useRouter();

    useEffect(() => {
        const deliveryStorage = localStorage.getItem("deliveryPartner");
        if (!deliveryStorage) {
            router.push('/deliveryPartner-auth');
        }
    }, [])
    return (
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
        </div>
    )
}

export default page
