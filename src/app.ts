import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import koaBunyanLogger from 'koa-bunyan-logger';

import indexRouter from './routes/index';

// Global hash set to track active request IDs
const activeRequestIds = new Set<string>();

const app = new Koa();
app.use(koaBunyanLogger());
app.use(bodyParser());
app.use(koaBunyanLogger.requestIdContext());
app.use(koaBunyanLogger.requestLogger());

// useful headers

app.use(async (ctx, next) => {
    const start = Date.now();

    ctx.set('X-Request-Id', ctx.log.fields.req_id);
    ctx.set('X-Request-Timestamp', new Date().toISOString());

    // Log incoming request
    const requestLog = {
        method: ctx.method,
        url: ctx.url,
        headers: ctx.headers,
        requestId: ctx.log.fields.req_id,
        timestamp: new Date().toISOString()
    };
    console.log('Incoming request:', JSON.stringify(requestLog));

    // Add request ID to active requests set
    activeRequestIds.add(ctx.log.fields.req_id);

    await next();

    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);

    // Log response
    const responseLog = {
        method: ctx.method,
        url: ctx.url,
        status: ctx.status,
        requestId: ctx.log.fields.req_id,
        responseTime: `${ms}ms`,
        timestamp: new Date().toISOString()
    };
    console.log('Response:', JSON.stringify(responseLog));

    // Remove request ID from active requests set
    activeRequestIds.delete(ctx.log.fields.req_id);
});


// routes

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());


// server

process.on('SIGINT', async () => {
    console.log('Time to shut down gracefully!');
    
    // Check active requests every 3 seconds until empty
    const checkActiveRequests = () => {
        if (activeRequestIds.size === 0) {
            console.log('All requests completed, shutting down...');
            process.exit(0);
        } else {
            console.log(`Waiting for ${activeRequestIds.size} active requests to complete...`);
            setTimeout(checkActiveRequests, 3000);
        }
    };
    
    checkActiveRequests();
});

app.listen(3000);

export default app;
export { activeRequestIds };