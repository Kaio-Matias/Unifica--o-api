# I-Saúde Social Feed Service

## Overview
Social Feed service for I-Saúde platform that manages user posts, interactions, and social networking features.

## Tech Stack
- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL

## Main Features
- User posts and updates
- Social interactions (likes, comments, shares)
- Content moderation
- Feed generation and management
- Media handling

## Project Structure
```
src/
├── app/
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
Complete API documentation is available through Swagger at `/api-docs`.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=3002
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/social_feed
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

### Posts
- Create, read, update, and delete posts
- Support for text, images, and links
- Post visibility control
- Hashtag support

### Interactions
- Like/unlike posts
- Comment on posts
- Share posts
- Follow/unfollow users

### Feed Management
- Personalized feed generation
- Content filtering
- Trending topics
- Activity tracking

## Error Handling
Standardized error responses:
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
