import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../lib/db";
import Food from "../../../../../lib/model/foodModel";

//this POST api for Adding Food Items..... 
export async function POST(request, response) {
    await mongoose.connect(connectionStr)
    let payload = await request.json();
    let foods = new Food(payload);
    const data = await foods.save();
    let success = false;
    if (data) {
        success = true;
    }
    return NextResponse.json({ result: data, success })
}



