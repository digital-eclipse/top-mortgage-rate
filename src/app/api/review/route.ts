// pages/api/fetchReviews.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = 'ChIJK_nIvz42K4gRplalQTFTT-A';
  const fields = 'rating,user_ratings_total'; 

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=${fields}&key=${apiKey}`
    );
    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.error();
  }
}
