import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../lib/db";
import Food from "../../../../../lib/model/foodModel";
import Restaurant from "../../../../../lib/model/restaurantModel";

export async function GET(request, response) {
    const specificId = response.params.restaurantItems
    // console.log(specificId);
    await mongoose.connect(connectionStr);
    const restaurantData = await Restaurant.find({ _id: specificId });
    const FoodData = await Food.find({ resto_id: specificId });
    return NextResponse.json({ result: { restaurantData, FoodData }, success: true })
}