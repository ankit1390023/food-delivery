import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { NextResponse } from "next/server";
import Order from "../../../../lib/model/orderModel";
import Restaurant from "../../../../lib/model/restaurantModel";


export async function POST(request, response) {
    await mongoose.connect(connectionStr);
    let payload = await request.json();

    const orderObj = new Order(payload);
    let data = await orderObj.save();

    if (data) {
        return NextResponse.json({ result: data, success: true })
    } else {
        return NextResponse.json({ result: data, success: false })
    }
}


export async function GET(request, response) {
    let userId = request.nextUrl.searchParams.get('id');
    console.log('userId', userId)
    await mongoose.connect(connectionStr);

    let data = await Order.find({ user_Id: userId });
    let restoData = [];

    if (data) {
        restoData = await Promise.all(data.map(async (item) => {
            let restoInfo = {};
            restoInfo.data = await Restaurant.findOne({ _id: item.resto_Id });
            restoInfo.amount = item.amount;
            restoInfo.status = item.status;
            return restoInfo;
        }));
    }

    return NextResponse.json({ restoData, success: true });
}



























