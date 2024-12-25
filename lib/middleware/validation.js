import { NextResponse } from 'next/server';

export function validateRequest(schema) {
  return async (req) => {
    try {
      const body = await req.json();
      await schema.parseAsync(body);
      return null;
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
  };
}