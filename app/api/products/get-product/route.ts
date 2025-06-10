import getProductData from '@/actions/get-product-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const productId = request.nextUrl.searchParams.get('productId');
  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  const productData = await getProductData(productId);
  if (!productData) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(productData);
}
