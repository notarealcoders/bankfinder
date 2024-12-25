import { logger } from './winston';

export function logError(error, context = {}) {
  logger.error({
    type: 'error',
    message: error.message,
    stack: error.stack,
    ...context
  });
}