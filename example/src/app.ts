import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import { v4 as uuidv4 } from 'uuid';
import koaBunyanLogger from 'koa-bunyan-logger';

import indexRouter from './routes/index';


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

    await next();

    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});


// routes

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());


// logger

// app.use(async (ctx, next) => {
//     await next();

//     console.log({
//         request: ctx.request,
//         response: ctx.response,
//         requestId: ctx.response.get('X-Request-Id'),
//     })

//     ctx.log.info({
//         request: ctx.request,
//         response: ctx.response,
//         requestId: ctx.response.get('X-Request-Id'),
//     });
// });

process.on('SIGINT', async () => {
    console.log('Time to shut down gracefully!');
    process.exit(0);
});

app.listen(3000);

export default app;