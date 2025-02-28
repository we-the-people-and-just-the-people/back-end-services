import { Context, Next } from 'koa';
import Router from 'koa-router';

const router = new Router({
    strict: false
});

router
    .get('/', helloWorld)
    .get('/hello', helloWorldFromPath);

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

    await next();
}

export default router;