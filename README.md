# Chat App

A secure real-time chat application with private chat rooms, server-side AES-256-GCM message encryption, and JWT-based authentication. Built as an independent programming project to practice full-stack development, security, and real-time communication.

## Live Demo

https://chatapp.micnusz.xyz

![Chat App Screenshot](./screenshots/1.png)

## Features

- Private chat rooms with isolated communication
- Real-time messaging via WebSockets
- Server-side AES-256-GCM encryption of messages
- JWT authentication stored in HTTP-only cookies
- Login and registration rate-limiting
- Client-side state management using React Query & Zustand
- Unit tests for core authentication and messaging logic

## Tech Stack

- **Frontend:** TypeScript, React, Next.js
- **Backend:** Java, Spring Boot, WebSocket API, REST API ([backend repo](https://github.com/micnusz/chat-app-backend))
- **Hosting:** AWS with basic NGINX configuration
- **Security:** AES-256-GCM encryption, JWT, HTTP-only cookies
- **Testing:** JUnit

### Prerequisites

- Node.js (v18+)
- Java (JDK 17+)
- Maven

### Installation

1. Clone both repositories:

```bash
git clone https://github.com/micnusz/chat-app-frontend.git
git clone https://github.com/micnusz/chat-app-backend.git
```

2. Configure backend environment variables (AES secret, JWT secret).
3. Start backend:

```bash
cd chat-app-backend
./mvnw spring-boot:run
```

4. Start frontend:

```bash
cd chat-app-frontend
npm install
npm run dev
```

5. Open your browser at `http://localhost:3000`.

## Testing

- Backend unit tests with JUnit:

```bash
cd chat-app-backend
./mvnw test
```
