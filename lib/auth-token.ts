import { jwtVerify } from 'jose';

// Define the shape of the token payload
export interface TokenPayload {
  user_id?: string;
  uid?: string;
  email?: string;
  exp: number;
  iat: number;
}

// Function to verify and decode the token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  if (!token) return null;

  try {
    // Decode the token to extract information
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(
      Buffer.from(base64Payload, 'base64').toString('utf-8')
    );

    // Basic expiration check
    if (decodedPayload.exp * 1000 < Date.now()) {
      console.error('Token has expired');
      return null;
    }

    // Verify token structure and required fields
    if (!decodedPayload.user_id && !decodedPayload.uid) {
      console.error('Invalid token payload');
      return null;
    }

    // Lightweight verification using public key strategy
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    );

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['RS256']
    });

    return payload as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Function to check if a token is valid
export async function isValidToken(token: string): Promise<boolean> {
  const payload = await verifyToken(token);
  return !!payload;
}

// Function to get user ID from token
export async function getUserIdFromToken(token: string): Promise<string | null> {
  const payload = await verifyToken(token);
  return payload ? (payload.user_id || payload.uid || null) : null;
}

// Function to check token expiration
export function isTokenExpired(token: string): boolean {
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(
      Buffer.from(base64Payload, 'base64').toString('utf-8')
    );
    return Date.now() >= payload.exp * 1000;
  } catch (error) {
    return true;
  }
}