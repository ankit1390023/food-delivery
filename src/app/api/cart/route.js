import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { NextResponse } from "next/server";
import Cart from "../../../../lib/model/cartModel";


export async function POST(request, response) {
    let payload = await request.json();

    await mongoose.connect(connectionStr);
    const respo = await Cart.insertMany(payload);
    return NextResponse.json({ result: data, success: true })
}