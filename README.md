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

## Getting Started

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

## Highlights

- Realtime currency and coin updates with Socket.IO
- MySQL data layer with Sequelize models for prices and archives
- Public Next.js website with responsive pages and local assets
- Electron desktop interface for administrative price management
- Separate documentation for every application in the workspace

## Author

Zahra Jafarifard
