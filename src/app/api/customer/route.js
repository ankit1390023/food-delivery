
import { NextResponse } from 'next/server';
import { mongoose } from 'mongoose';
import { connectionStr } from '../../../../lib/db';
import Restaurant from '../../../../lib/model/restaurantModel';

export async function GET(request, response) {
    let queryParams = request.nextUrl.searchParams;
    // console.log(queryParams.get('restaurantName'));

    await mongoose.connect(connectionStr);

    let filter = {}
    if (queryParams.get('restaurantName')) {
        const restaurantName = queryParams.get('restaurantName');
        filter = { restaurantName: { $regex: new RegExp(restaurantName, 'i') } }
    }
    else if (queryParams.get("city")) {
        const city = queryParams.get('city');
        filter = { city: { $regex: new RegExp(city, 'i') } }
    }
    let data = await Restaurant.find(filter);

    return NextResponse.json({ result: data, success: true });
}