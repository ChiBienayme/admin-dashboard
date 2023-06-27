import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/' };

export async function middleware() {
    const users = await get('users');

    return NextResponse.json(users);
}
