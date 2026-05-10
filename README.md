# Microservices Chat System

A production-ready microservices-based chat system built with Node.js, Express, TypeScript, and MongoDB.

## Services

1. **Auth Service**: User management and authentication (JWT).
2. **Message Service**: Messaging and conversation management.

## Prerequisites

- Node.js (v20+)
- Docker and Docker Compose
- MongoDB (if running locally)

## Running with Docker

The easiest way to run the entire system is using Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Auth DB (Port 27018)
- Message DB (Port 27019)
- Auth Service (Port 5001)
- Message Service (Port 5002)

## Manual Setup

### 1. Auth Service
```bash
cd auth-service
npm install
cp .env.example .env
npm run dev
```

### 2. Message Service
```bash
cd message-service
npm install
cp .env.example .env
npm run dev
```

## API Documentation

### Auth Service (Port 5001)
- `POST /api/v1/auth/register`: { name, email, password }
- `POST /api/v1/auth/login`: { email, password }
- `GET /api/v1/auth/me`: Requires Bearer Token

### Message Service (Port 5002)
- `POST /api/v1/messages/send`: { recipientId, text } (Requires Bearer Token)
- `GET /api/v1/messages/:conversationId`: Get history (Requires Bearer Token)
- `GET /api/v1/conversations`: List user conversations (Requires Bearer Token)
