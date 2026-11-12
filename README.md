9# Vibefund

Vibefund is a Next.js web app for discovering, evaluating, and funding startup-style applications built by founders using AI tooling. The platform surfaces promising apps, tracks presale activity, and helps users move from discovery to launch and token support flows.

## What this project does

- Lists and showcases app projects and trending launch opportunities
- Displays active presale and token data for projects
- Lets users explore app details, funding status, and pool information
- Supports app creation and launch flows for new projects
- Uses wallet authentication and embedded wallet experiences via Privy
- Integrates with an external backend API for project and presale data

## Core features

- App discovery homepage with project cards and featured listings
- Presale detail pages for individual projects
- Launch app flow for new product submissions
- Sign in and sign out flows using wallet-based authentication
- Pool and liquidity reporting for completed launches
- Responsive dark UI built around a modern fintech / crypto startup aesthetic

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion for UI animation
- Ethers.js for onchain interactions
- Privy for authentication and embedded wallets
- shadcn-style UI primitives and custom components

## Project structure

```text
app/                 # App Router pages and API routes
components/          # Reusable UI and feature components
public/              # Static assets and logos
next-env.d.ts        # Next.js TypeScript config
README.md            # Project overview and setup notes
```

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

If there is no `.env.example` file in this repo yet, create `.env.local` manually with the variables below.

3. Add the required environment variables:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_PRIVY_CLIENT_ID=your_privy_client_id
```

4. Start the app:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Environment notes

- `NEXT_PUBLIC_BACKEND_URL` points to the backend service that provides app, presale, and launch data.
- `NEXT_PUBLIC_SITE_URL` is used for metadata and generated URLs.
- `NEXT_PUBLIC_PRIVY_APP_ID` and `NEXT_PUBLIC_PRIVY_CLIENT_ID` are required for wallet sign-in and embedded wallet flows.

## Important integration detail

This frontend expects a backend API to be running alongside it. Many pages fetch data from endpoints like:

- `/api/presales`
- `/api/apps_list`
- `/api/app_details`
- `/api/new_app`
- `/api/sign_in`
- `/api/sign_out`

If your backend is not running, the app may show empty data states or fail to load market/project information.

## Scripts

Use the standard Next.js scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This repository is focused on the frontend experience for a launch and discovery platform. If you are contributing, keep the UI, project flow, and wallet/auth integration consistent with the existing app patterns.

