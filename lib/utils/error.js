export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export function handleError(error) {
  console.error("Error:", error);

  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    return {
      success: false,
      error: "Validation Error",
      details: Object.values(error.errors).map((err) => err.message),
      statusCode: 400,
    };
  }

  // Handle MongoDB duplicate key errors
  if (error.code === 11000) {
    return {
      success: false,
      error: "Duplicate Entry",
      details: error.keyValue,
      statusCode: 409,
    };
  }

  return {
    success: false,
    error: "Internal Server Error",
    statusCode: 500,
  };
}
