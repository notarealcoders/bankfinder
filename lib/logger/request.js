import { logger } from './winston';

export function logRequest(req) {
  const start = Date.now();
  return {
    finish: () => {
      const duration = Date.now() - start;
      logger.info({
        type: 'request',
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        userAgent: req.headers.get('user-agent'),
        ip: req.headers.get('x-forwarded-for') || req.ip
      });
    }
  };
}