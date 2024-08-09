import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../../lib/db";
import Food from "../../../../../../lib/model/foodModel";

export async function GET(request, response) {
    const specificId = response.params.id;
    await mongoose.connect(connectionStr);
    const data = await Food.find({ resto_id: specificId })
    return NextResponse.json({ result: data, success: true })
}

// export async function GET(request, response) {
// const specificId = response.params.id;
// await mongoose.connect(connectionStr);
// const data = await Food.find({ price: { $gte: 10, $lte: 400 } }).sort({ price: 1 })
// return NextResponse.json({ result: data, success: true })
// }

export async function DELETE(request, response) {
    await mongoose.connect(connectionStr);
    const specificId = await response.params.id;
    console.log(specificId)
    const deletedFoodItem = await Food.deleteOne({ _id: specificId });
    let success = false;
    if (deletedFoodItem.deletedCount > 0) {
        success = true;
    }
    return NextResponse.json({ result: deletedFoodItem, success })
}