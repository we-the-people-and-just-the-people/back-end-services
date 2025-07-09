import { Context, Next } from 'koa';
import Router from 'koa-router';

const router = new Router({
    strict: false
});

router
    .get('/', helloWorld)
    .get('/hello', helloWorldFromPath)
    .get('/liveness', livenessProbe);

/**
 * This function sets the response to a simple test.
 *
 * @param {Context} ctx - The context of the request.
 * @param {Next} next - The next function to be executed.
 */
async function helloWorld(ctx: Context, next: Next) {
    ctx.body = {
        message: 'Hello World',
    };

    ctx.log.info("This is a log message from the helloWorld function.");

    await next();
}

/**
 * This function is fancier than helloWorld().
 *
 * @param {Context} ctx - The context of the request.
 * @param {Next} next - The next function to be executed.
 */
async function helloWorldFromPath(ctx: Context, next: Next) {
    ctx.body = {
        message: `Hello World from ${ctx.request.path}`,
    };

    ctx.log.info("This is a log message from the helloWorldFromPath function.");

    await next();
}

/**
 * Kubernetes liveness probe endpoint.
 *
 * @param {Context} ctx - The context of the request.
 * @param {Next} next - The next function to be executed.
 */
async function livenessProbe(ctx: Context, next: Next) {
    ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString()
    };

    ctx.log.info("Liveness probe check completed.");

    await next();
}

export default router;