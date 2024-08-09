import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { NextResponse } from "next/server";
import Restaurant from "../../../../lib/model/restaurantModel";

export async function POST(request, response) {
    try {
        await mongoose.connect(connectionStr);

        const payload = await request.json();
        let data;
        let success = false;
        console.log('payload', payload);


        if (payload.login) {
            // Attempt to find a restaurant for login
            data = await Restaurant.findOne({ email: payload.email, password: payload.password });
            if (data) {
                success = true; // Login successful
            }
        } else {
            // Create a new restaurant for signup
            console.log('payload', payload);
            const restaurant = new Restaurant(payload);
            data = await restaurant.save();
            console.log('data', data);
            if (data) {
                success = true; // Signup successful
            }
        }

        // await mongoose.disconnect();

        return NextResponse.json({ result: data, success });
    } catch (error) {
        // Handle any errors that occur during database operations or processing
        console.error("Error processing request:", error);
        await mongoose.disconnect(); // Disconnect from MongoDB on error

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
