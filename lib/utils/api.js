import { NextResponse } from "next/server";

export function handleApiError(error, defaultMessage = "An error occurred") {
  console.error(`API Error: ${error.message}`, error);

  const statusCode = error.statusCode || 500;
  const message = error.message || defaultMessage;

  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
    { status: statusCode }
  );
}

export function validateQueryParams(params, requiredParams = []) {
  const missingParams = requiredParams.filter((param) => !params[param]);

  if (missingParams.length > 0) {
    throw {
      statusCode: 400,
      message: `Missing required parameters: ${missingParams.join(", ")}`,
    };
  }
}

export function sanitizeQueryParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
}