# We The People and Just The People - Backend Service Example

This is a single microservice built with Node.js, TypeScript, and Koa framework. It serves as an example backend service for the We The People and Just The People project.

## Features

This service includes:

- [Koa](https://koajs.com/) web framework
- TypeScript configuration
- Request ID middleware
- Response time tracking
- Graceful shutdown handling
- Jest testing setup with supertest
- GitHub Actions CI/CD pipeline
- Docker containerization

## Directory Structure

```
backend-service-example/
├── src/                    # Source code
│   ├── app.ts              # Main application entry point
│   └── routes/             # API route definitions
│       └── index.ts        # Default routes
├── tests/                  # Test files
│   └── index.test.ts       # Main app tests
├── .github/workflows/      # CI/CD workflows
├── Dockerfile              # Container definition
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest testing configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/we-the-people-and-just-the-people/back-end-service-example.git
   cd back-end-service-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

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

## Development Workflow

1. Clone the repository
2. Install dependencies: `npm install`
3. Make code changes in the `src/` directory
4. Run tests: `npm test`
5. Submit PR for review

## API Endpoints

The service provides the following endpoints:

- `GET /` - Returns a simple "Hello World" message
- `GET /hello` - Returns a "Hello World" message with the request path

## Testing

Tests are located in the `tests/` directory and use Jest as the testing framework, with supertest for API testing.

```bash
npm run test
```

## Deployment

### Docker

1. Build the Docker image:
   ```bash
   docker build -t backend-service-example .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 backend-service-example
   ```

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the service:
   ```bash
   npm start
   ```

The service will be available at `http://localhost:3000`

## Configuration

- **Port**: The service runs on port 3000 by default
- **Environment Variables**: Add environment variables as needed for your specific deployment

## CI/CD Pipeline

The GitHub Actions workflows automatically:

### Pull Request Workflow
1. Triggers on pull requests to main
2. Installs dependencies
3. Runs tests
4. Builds the Docker image (on merge to main)

### Release Workflow
1. Triggers on semantic version tags (e.g., `v1.0.0`, `v2.1.3`)
2. Installs dependencies and builds the project
3. Runs tests to ensure quality
4. Automatically creates a GitHub release with changelog

To create a new release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## License

This project is licensed under the GNU General Public License v2.0. See the [LICENSE](LICENSE) file for details.