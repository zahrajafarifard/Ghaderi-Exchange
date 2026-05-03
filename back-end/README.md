# Ghaderi Exchange Backend

Express API for Ghaderi Exchange. It manages currency and coin prices, archives historical changes, exposes public website endpoints, accepts admin updates from the desktop app, and broadcasts realtime updates with Socket.IO.

## Tech Stack

- Node.js
- Express
- Socket.IO
- Sequelize
- MySQL

## Setup

```bash
npm install
cp .env.example .env
npm start
```

The server runs on `PORT` from `.env`, defaulting to `4000`.

## Environment Variables

```text
PORT=4000
VERSION=1
DB_NAME=ghaderi
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
ADMIN_SECRET_KEY=replace-with-a-secure-secret
TABLO_HOST=127.0.0.1
TABLO_PORT=8080
```

## Main Endpoints

- `GET /api/featuredCurrencies`
- `GET /api/featuredCoins`
- `GET /api/getallcurrencies`
- `GET /api/getallcoins`
- `POST /api/search`
- `POST /admin/updateCurrency`
- `POST /admin/updateCoin`
- `POST /admin/registerConfig`

## Notes

- MySQL must be running before starting the API.
- Admin update routes require the `secretKey` request header to match `ADMIN_SECRET_KEY`.
- Socket.IO events are emitted after successful price updates.

## Author

Zahra Jafarifard
