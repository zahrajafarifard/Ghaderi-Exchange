# Ghaderi Exchange Desktop App

Electron and React desktop application for managing Ghaderi Exchange currency and coin prices. The app gives administrators a focused interface for updating prices, clearing displayed values, receiving status notifications, and sending changes to the backend.

## Tech Stack

- Electron
- React
- Redux
- React Router
- Tailwind CSS

## Setup

```bash
npm install
cp .env.example .env
npm start
```

## Available Scripts

- `npm start` - run the React development server
- `npm run electron` - run the Electron shell
- `npm run build` - create a production React build
- `npm run electron:package:win` - package for Windows
- `npm run electron:package:mac` - package for macOS
- `npm run electron:package:linux` - package for Linux

## Environment Variables

```text
REACT_APP_URL=http://localhost:4000
REACT_APP_SECRET_KEY=replace-with-the-backend-admin-secret
```

## Author

Zahra Jafarifard
