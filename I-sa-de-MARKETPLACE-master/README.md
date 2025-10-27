# I-Saúde Marketplace Service

## Overview
Marketplace service for I-Saúde platform that handles product listings, orders, and payment processing through MercadoPago integration.

## Tech Stack
- Node.js
- TypeScript
- Express.js
- MercadoPago SDK
- TypeORM

## Main Features
- Product/Service management
- Order processing
- Payment integration with MercadoPago
- Transaction history
- Payment notifications

## Project Structure
```
src/
├── app/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── entities/      # Database entities
│   ├── interfaces/    # TypeScript interfaces
│   ├── middlewares/   # Express middlewares
│   ├── repositories/  # Data access layer
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/        # Helper functions
├── database/
│   ├── migrations/    # Database migrations
│   └── typeorm.ts    # Database configuration
├── app.ts            # Express app configuration
├── routes.ts         # Main routes configuration
└── server.ts        # Server initialization
```

## API Documentation
API documentation is available through Swagger at `/api-docs` endpoint.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=3001
NODE_ENV=development
MERCADO_PAGO_ACCESS_TOKEN=your_token_here
NOTIFICATION_URL=your_webhook_url
```

3. Start development server:
```bash
npm run dev
```

4. Run database migrations:
```bash
npm run typeorm migration:run
```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run migration:generate`: Generate new migration
- `npm run migration:run`: Run pending migrations

## Payment Integration
The service integrates with MercadoPago for payment processing. Key features:
- Multiple payment methods (Credit Card, Boleto, PIX)
- Order management
- Payment notifications
- Transaction history

## Error Handling
The service implements standardized error responses:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Testing
Run tests using:
```bash
npm test
```

Unit tests and integration tests are available in the `__tests__` directory.
