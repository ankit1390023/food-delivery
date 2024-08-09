
import { NextResponse } from 'next/server';
import { connectionStr } from '../../../../../lib/db';
import { mongoose } from 'mongoose';
import Restaurant from '../../../../../lib/model/restaurantModel';

export async function GET(request, response) {
    await mongoose.connect(connectionStr);
    let data = await Restaurant.find();

    //jitne bhi city h unka first letter capital krne ke liye Word.charAt(0).toUpperCase() + Word.slice(1) 
    //let Word=jaunpur
    //    let Word=jaunpur
    //    let firstLetter=Word.charAt(0).toUpperCase()
    //    let restLetter=Word.slice(1)
    //    let finalWord=firstLetter+restLetter
    //    console.log(finalWord)

    data = data.map((item) => (item.city).charAt(0).toUpperCase() + (item.city).slice(1));

    //Jitne bhi  city repeat ho rhe h unko unique krne ke liye set me store 
    data = [...new Set(data.map((item) => item))]
    return NextResponse.json({ result: data, success: true });
}