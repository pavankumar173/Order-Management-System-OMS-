# Order Management System (OMS)

Full-stack OMS with Spring Boot, React, MySQL, and Kafka.

## Stack
- Backend: Java 17, Spring Boot 3.4
- Frontend: React + Vite + TypeScript + MUI
- Database: MySQL 8 (H2 for dev)
- Messaging: Apache Kafka (producer/consumer)

## Quick Start (Dev)
1) Start backend (H2, port 8080):
```
cd oms-api
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
./mvnw spring-boot:run
```
2) Start frontend (port 5173):
```
cd oms-frontend
npm install
npm run dev
```
Open http://localhost:5173

## With Docker (MySQL + Kafka)
```
docker compose up -d
cd oms-api
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
./mvnw spring-boot:run -Dspring-boot.run.profiles=mysql
```

## REST APIs
- POST /api/auth/register { username, password }
- POST /api/auth/login { username, password } -> { token }
- POST /api/orders { userId, productName, quantity, price }
- GET /api/orders/user/{userId}

## Kafka
- Topic: order-events
- Producer: publishes JSON on order creation
- Consumer: logs: "Order placed successfully ..."

## CI
- .github/workflows/backend.yml (Maven test)
- .github/workflows/frontend.yml (Node build) 