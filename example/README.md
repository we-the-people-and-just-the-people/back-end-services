# Example Microservice Template

This directory serves as a template for creating new microservices within the project. Teams should make a copy of this directory as a starting point for their own microservice implementation.

## Getting Started

1. Copy this directory to create your new microservice
2. Update the `package.json` with your service name and description
3. Modify the code in `src/` to implement your service logic

## Directory Structure

```
example/
├── src/                    # Source code
│   ├── app.ts              # Main application entry point
│   └── routes/             # API route definitions
│       └── index.ts        # Default routes
│   └── utils/              # Utilities
├── tests/                  # Test files
│   ├── app.test.ts         # Main app tests
├── Dockerfile              # Container definition
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Features

This template includes:

- [Koa](https://koajs.com/) web framework
- TypeScript configuration
- Request ID middleware
- Response time tracking
- Graceful shutdown handling
- Jest testing setup with supertest
- GitHub Actions workflow integration

## Available Scripts

```bash
# Install dependencies
npm install

# Build the project (transpile TypeScript)
npm run build

# Start the service
npm start

# Development mode (watch for changes)
npm run dev

# Run tests
npm run test
```

## Testing

Tests are located in the `tests/` directory and use Jest as the testing framework, with supertest for API testing.

```bash
npm run test
```

## Customization

1. Update the port in `app.ts` if needed (default: 3000)
2. Add new routes in the `routes/` directory
3. Add middleware in `app.ts` as required
4. Configure environment variables for your specific needs

## CI/CD Integration

A GitHub Actions workflow is included that automatically runs tests for directories containing Dockerfiles when changes are made in a pull request.

## Deployment

1. Build the Docker image:
   ```bash
   docker build -t your-service-name .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 your-service-name
   ```

## License

See the project root for license information.