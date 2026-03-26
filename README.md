# 🐾 Pokemon Dashboard

Full-stack Pokemon Dashboard application built with **NestJS** + **TypeORM** + **PostgreSQL** (Backend) and **React** + **TypeScript** (Frontend).

---

## 📦 Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | NestJS, TypeORM, PostgreSQL, JWT    |
| Frontend | React, TypeScript, Ant Design, Vite |
| Infra    | Docker, Docker Compose              |

---

## 🚀 Quick Start (Docker Compose)

### 1. Clone the repository

```bash
git clone https://github.com/phanumat44/PokeAPI-integration-Project.git
cd PokeAPI-integration-Project
```

### 2. Create environment file

Copy the example and adjust as needed:

```bash
cp .env.example .env
```

**`.env` variables:**

| Variable      | Description        | Default                     |
| ------------- | ------------------ | --------------------------- |
| `DB_HOST`     | Database host      | `db`                        |
| `DB_PORT`     | Database port      | `5432`                      |
| `DB_USER`     | Database user      | `postgres`                  |
| `DB_PASSWORD` | Database password  | `postgres_password`         |
| `DB_NAME`     | Database name      | `pokeapi`                   |
| `JWT_SECRET`  | Secret key for JWT | `super-secret-key-12345`    |
| `POKEAPI_URL` | PokeAPI base URL   | `https://pokeapi.co/api/v2` |

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

This starts 3 services:

| Service    | URL                   |
| ---------- | --------------------- |
| Frontend   | http://localhost:5173 |
| Backend    | http://localhost:3000 |
| PostgreSQL | localhost:5432        |

### 4. Stop

```bash
docker-compose down
```

---

## 🔗 API Endpoints

| Method | Endpoint                 | Auth | Description      |
| ------ | ------------------------ | ---- | ---------------- |
| POST   | `/register`              | ❌   | Register user    |
| POST   | `/login`                 | ❌   | Login → JWT      |
| GET    | `/pokemon/:name`         | ✅   | Get Pokemon data |
| GET    | `/pokemon/:name/ability` | ✅   | Get abilities    |
| GET    | `/pokemon/random`        | ❌   | Random Pokemon   |

### Example Requests

**Register:**

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "ash", "password": "pikachu123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "ash", "password": "pikachu123"}'
```

**Get Pokemon (with JWT):**

```bash
curl http://localhost:3000/pokemon/pikachu \
  -H "Authorization: Bearer <your_token>"
```

---

## 🧪 Running Tests (Optional)

Run backend unit tests inside the Docker container:

```bash
docker exec -it pokeapi_backend npm run test
```

---

## 📁 Project Structure

```
PokeAPI/
├── backend/
│   ├── src/
│   │   ├── auth/          # Register, Login, JWT Guard
│   │   ├── pokemon/       # Pokemon endpoints + PokeAPI integration
│   │   ├── user/          # User entity
│   │   └── common/        # Exception filters
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # LoginPage, PokemonPage
│   │   ├── hooks/         # useLogin, usePokemon (custom hooks)
│   │   ├── context/       # AuthContext (JWT management)
│   │   ├── api/           # Axios instance + interceptors
│   │   └── types/         # Shared TypeScript interfaces
│   ├── Dockerfile
│   └── package.json
├── postman/               # Postman collection + environment
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 📮 Postman

Import the files from the `postman/` directory:

- `PokeAPI_Collection.postman_collection.json`
- `PokeAPI_Environment.postman_environment.json`

The collection auto-saves the `access_token` after a successful login request.

[View the Guide for Importing and Using the Postman Collection](./postman_collection_guide.md)
