const isEdgeRuntime = process.env.NEXT_RUNTIME === 'edge';

export const logger = isEdgeRuntime 
  ? require('./edge').edgeLogger
  : require('./node').nodeLogger;

export function logRequest(req) {
  const start = Date.now();
  return {
    finish: () => {
      const duration = Date.now() - start;
      logger.info('API Request', {
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        userAgent: req.headers.get('user-agent'),
      });
    }
  };
}