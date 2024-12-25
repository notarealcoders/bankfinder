import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank Finder API',
      version: '1.0.0',
      description: 'API documentation for Bank Finder application',
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        description: 'API Server',
      },
    ],
  },
  apis: ['./app/api/**/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(swaggerSpec);
}