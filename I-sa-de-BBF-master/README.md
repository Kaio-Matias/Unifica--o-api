# I-Saúde Backend For Frontend (BFF)

## Overview
Backend for Frontend service that acts as an API gateway for the I-Saúde platform, orchestrating requests between different microservices and providing a unified API for frontend applications.

## Tech Stack
- Node.js
- TypeScript
- Express.js

## Main Features
- API Gateway for microservices
- Request orchestration
- Response aggregation
- Error handling and standardization

## Project Structure
```
src/
├── app/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/         # Helper functions
├── app.ts             # Express app configuration
├── routes.ts          # Main routes configuration
└── server.ts         # Server initialization
```

## API Documentation
The API documentation is generated using Swagger. You can access it by visiting `/api-docs` endpoint.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
NODE_ENV=development
```

## Available Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run swagger-autogen`: Generate API documentation
