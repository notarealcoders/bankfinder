const LOG_LEVELS = {
  INFO: "INFO",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
};

export function logCache(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data }),
  };

  // Log to console with appropriate formatting
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(`[${timestamp}] ERROR: ${message}`, data || "");
      break;
    case LOG_LEVELS.DEBUG:
      console.debug(`[${timestamp}] DEBUG: ${message}`, data || "");
      break;
    default:
      console.log(`[${timestamp}] INFO: ${message}`, data || "");
  }

  return logEntry;
}
