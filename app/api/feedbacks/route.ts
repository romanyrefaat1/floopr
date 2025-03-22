import { NextResponse } from 'next/server';
import getFilteredFeedbacks from '@/actions/filter-feedback';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const filterData = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const feedbacks = await getFilteredFeedbacks(productId, filterData);
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
} 