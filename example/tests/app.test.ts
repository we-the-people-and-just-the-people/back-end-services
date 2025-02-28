import request from 'supertest';
import app from '../src/app';
import { validate as uuidValidate } from 'uuid';

// Mock app.listen to prevent multiple server instances
jest.mock('koa', () => {
    const originalModule = jest.requireActual('koa');
    const mockListen = jest.fn().mockReturnValue({ close: jest.fn() });

    return class MockKoa extends originalModule.default {
        listen() {
            return mockListen();
        }
    };
});

describe('Koa Application', () => {
    beforeAll(() => {
        // Nothing needed here now
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should respond with 200 status for root route', async () => {
        const response = await request(app.callback()).get('/');
        expect(response.status).toBe(200);
    });

    it('should set X-Response-Time header', async () => {
        const response = await request(app.callback()).get('/');
        expect(response.headers['x-response-time']).toBeDefined();
        expect(response.headers['x-response-time']).toMatch(/^\d+ms$/);
    });

    it('should handle non-existent routes', async () => {
        const response = await request(app.callback()).get('/non-existent-route');
        expect(response.status).toBe(404);
    });

    it('should gracefully handle different request methods', async () => {
        const postResponse = await request(app.callback()).post('/');
        // Assuming the route accepts POST requests
        expect([200, 404, 405]).toContain(postResponse.status);
    });

    it('should process body parser middleware', async () => {
        const testData = { test: 'data' };
        const response = await request(app.callback())
            .post('/')
            .send(testData)
            .set('Content-Type', 'application/json');

        // Actual assertion depends on your route implementation
        expect([200, 404, 405]).toContain(response.status);
    });

    it('should generate X-Request-Id header when not provided', async () => {
        const response = await request(app.callback()).get('/');

        expect(response.headers['x-request-id']).toBeDefined();
        expect(uuidValidate(response.headers['x-request-id'])).toBe(true);
    });

    it('should set unique X-Request-Id for different requests', async () => {
        const firstResponse = await request(app.callback()).get('/');
        const secondResponse = await request(app.callback()).get('/');

        expect(firstResponse.headers['x-request-id']).toBeDefined();
        expect(secondResponse.headers['x-request-id']).toBeDefined();
        expect(firstResponse.headers['x-request-id']).not.toBe(secondResponse.headers['x-request-id']);
    });

    it('should properly exit on SIGINT signal', () => {
        // Mock process.exit
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

        // Trigger SIGINT
        process.emit('SIGINT');

        expect(mockConsoleLog).toHaveBeenCalledWith('Time to shut down gracefully!');
        expect(mockExit).toHaveBeenCalledWith(0);

        // Restore mocks
        mockExit.mockRestore();
        mockConsoleLog.mockRestore();
    });
});