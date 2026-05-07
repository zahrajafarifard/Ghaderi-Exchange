# Ghaderi Exchange

Ghaderi Exchange is a full-stack exchange-rate platform with three coordinated applications:

- `site` - public Next.js website for currency and coin prices, charts, search, and contact/about content.
- `desktop-app` - Electron and React desktop panel for managing live exchange prices.
- `back-end` - Express, Socket.IO, Sequelize, and MySQL API for price data, admin updates, archives, and realtime events.

## Project Structure

```text
Ghaderi-Exchange/
├── back-end/
├── desktop-app/
└── site/
```

## 🐳 Docker Setup (Recommended)

The project includes a full Docker Compose setup for running all services together.

### Start all services

```bash
docker compose up --build
```

This will start:

Backend API (Express + Socket.IO)
MySQL database
Frontend (Next.js site)

### ⛔ Stop all services

```bash
docker compose down
```

### 💣 Reset database (WARNING: deletes all data)

```bash
docker compose down -v
```

## Getting Started (Local Development)

Each project has its own dependencies and README. Start with the backend, then run the website or desktop app.

```bash
cd back-end
npm install
cp .env.example .env
npm start
```

```bash
cd site
npm install
npm run dev
```

```bash
cd desktop-app
npm install
npm start
```

## ✨ Features

⚡ Real-time currency & coin updates (Socket.IO)
🗄 MySQL database with Sequelize ORM
📊 Price history archives for coins & currencies
🌐 Responsive Next.js public website
🖥 Electron desktop admin panel
🐳 Full Docker Compose orchestration
🔄 Seeder-based initial data setup

## Author

Zahra Jafarifard
