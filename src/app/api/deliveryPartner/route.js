import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { NextResponse } from "next/server";

import DeliveryPartner from "../../../../lib/model/deliveryPartner";

export async function POST(request) {
    try {
        await mongoose.connect(connectionStr);

        const payload = await request.json();
        let data;
        let success = false;

        if (payload.login) {
            // Login user
            data = await DeliveryPartner.findOne({ email: payload.email, password: payload.password });

            if (data) {
                success = true;
            }
        } else {
            // Signup new user
            const { del_name, password, email, city, address, } = payload;

            // Check if the user already exists
            const existingUser = await DeliveryPartner.findOne({ email });

            if (existingUser) {
                return NextResponse.json({ message: "User already exists", success: false, statusCode: 400 });
            }

            // Include all fields in the new user

            const newUser = new User({ del_name, password, email, city, address });
            data = await newUser.save();

            if (data) {
                success = true;
            }
        }

        // Close the connection after database operations
        // await mongoose.disconnect();

        return NextResponse.json({ result: data, success });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Request failed", success: false, statusCode: 500 });
    }
}
