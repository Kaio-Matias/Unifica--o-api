# I-Saúde User Service

## Overview
User management service for I-Saúde platform that handles user authentication, authorization, and profile management.

## Tech Stack
- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- JWT Authentication

## Main Features
- User authentication
- Role-based authorization
- Profile management
- Password recovery
- Email verification
- Session management

## Project Structure
```
src/
├── app/
│   ├── controllers/   # Request handlers
│   ├── entities/      # Database entities
│   ├── interfaces/    # TypeScript interfaces
│   ├── middlewares/   # Express middlewares
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
Complete API documentation is available through Swagger at `/api-docs`.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=3004
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/users
JWT_SECRET=your_jwt_secret
SMTP_CONFIG=your_smtp_config
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

## Features in Detail

### Authentication
- User registration
- Login/logout
- Password reset
- Email verification
- JWT token management
- OAuth integration (if configured)

### User Management
- Profile CRUD operations
- Role management
- Permission control
- Account verification
- User preferences

### Security Features
- Password hashing
- Token-based authentication
- Role-based access control
- Session management
- Rate limiting

## User Types
- Patients
- Healthcare Professionals
- Administrators
- Support Staff

## Error Handling
Standardized error responses:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing
Run tests using:
```bash
npm test
```

Unit tests and integration tests are available in the `__tests__` directory.
