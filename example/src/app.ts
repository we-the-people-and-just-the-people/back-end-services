import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import { v4 as uuidv4 } from 'uuid';

import indexRouter from './routes/index';

const app = new Koa();
app.use(bodyParser());

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// request id

app.use(async (ctx, next) => {
    if (!ctx.get('X-Request-Id')) {
        ctx.set('X-Request-Id', uuidv4());
    }
    await next();
});


// routes

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());


// logger

app.use(async (ctx, next) => {
    console.log(ctx)

    await next();

    console.log(ctx.response);
});

process.on('SIGINT', async () => {
    console.log('Time to shut down gracefully!');
    process.exit(0);
});

app.listen(3000);

export default app;