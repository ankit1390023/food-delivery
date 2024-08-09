
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../../../lib/db";
import Food from "../../../../../../../lib/model/foodModel";
import mongoose from "mongoose";

//this GET Api in only for populate details in UpdatePage
export async function GET(request, response) {
    let food_id = response.params.id;
    await mongoose.connect(connectionStr)
    let updatedItem = await Food.findById({ _id: food_id })
    let success = false;
    if (updatedItem) {
        success = true;
    }
    return NextResponse.json({ result: updatedItem, success })
}
//this PUT Api is for  update the food item 
export async function PUT(request, response) {
    const id = response.params.id;
    const payload = await request.json();
    console.log(id);
    console.log(payload);
    await mongoose.connect(connectionStr);
    const updateData = await Food.findOneAndUpdate({ _id: id }, payload);
    let success = false;
    if (updateData) {
        success = true;
    }
    return NextResponse.json({ result: updateData, success })
}


