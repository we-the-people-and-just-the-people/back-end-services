import Koa from 'koa';
import bodyParser from '@koa/bodyparser';

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


// response

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());


// logger

app.use(async (ctx, next) => {
    await next();

    console.log(ctx);
});

process.on('SIGINT', async () => {
    console.log('Goodbye!');
    process.exit(0);
});

app.listen(3000);

export default app;