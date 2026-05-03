# Ghaderi Exchange Website

Public Next.js website for Ghaderi Exchange. It displays live currency and coin prices, featured market items, charts, search results, and company contact/about pages.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Material UI
- Socket.IO Client
- Swiper

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The development server runs at `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - create a production build
- `npm start` - run the custom production server
- `npm run lint` - run the configured lint command

## Project Notes

- Static images and fonts live in `public/`.
- The main page is composed from reusable components in `components/main`.
- Public pages are defined in the Next.js `app` directory.

## Author

Zahra Jafarifard
