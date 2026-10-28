# Hotelnest

Hotelnest is a hotel discovery and booking web application built with the MERN stack. It lets guests browse available rooms, view room details, manage bookings, and pay online. Hotel owners can register their property, add rooms, manage room availability, and view booking information.

## Features

### For guests
- Browse available rooms and hotel information.
- Search for stays by destination.
- View room details, amenities, images, and nightly prices.
- Check room availability for a date range.
- Create and view bookings.
- Sign in and manage sessions with Clerk.
- Pay for eligible bookings through Stripe.
- View recently searched destinations.

### For hotel owners
- Register a hotel property.
- Add rooms with images, amenities, and nightly prices.
- Upload room images through Cloudinary.
- View listed rooms and manage availability.
- Access a dashboard with booking and revenue information.
## Screenshots

### Dashboard
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/fae86361-af17-4bae-9ed6-3d4da2a163e6" />


### Hotel Rooms Page
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/9dff4f14-d25f-4b69-a52c-bf5e420d5a28" />



### Admin Dashboard
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/16876a2d-f88d-497c-a3ee-e31b1b8da35e" />


### Admin Room Listing Page
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/17a7f97a-01fb-4b3b-8f2c-ace0975e9f4f" />


## Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS 4
- React Router
- Clerk React
- Axios
- React Hot Toast

**Backend**
- Node.js
- Express 5
- MongoDB with Mongoose
- Clerk Express middleware
- Cloudinary
- Stripe
- Multer

**Deployment configuration**
- Vercel configuration files are included for the client and server.

## Project Structure

```text
Hotelnest/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── package.json
    ├── server.js
    └── vercel.json
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- A MongoDB database (local or MongoDB Atlas)
- Clerk application credentials
- Cloudinary credentials
- Stripe credentials if using online payments

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GarvKaushik/Hotelnest_
cd Hotelnest
```

Replace `<YOUR_REPOSITORY_URL>` with the URL of your repository.

### 2. Configure the backend

Move into the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the following variables:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Use the actual variable names expected by the code and your Clerk webhook configuration. Never commit real credentials to version control. Some integrations may require additional environment variables depending on the deployment setup.

Start the backend:

```bash
npm run server
```

The server uses port `3000` by default, unless `PORT` is set.

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=$
```

Set `VITE_BACKEND_URL` to the deployed API URL when running against a hosted backend. Vite exposes variables prefixed with `VITE_` to client-side code, so do not put secrets in these variables.

Start the frontend development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Scripts

### Client (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production frontend |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Server (`server/`)

| Command | Description |
|---|---|
| `npm run server` | Start the backend with Nodemon |
| `npm start` | Start the backend with Node.js |

## API Overview

The backend mounts the following API route groups:

| Base path | Purpose |
|---|---|
| `/api/user` | Retrieve user data and store recent destination searches |
| `/api/hotels` | Register a hotel |
| `/api/rooms` | Retrieve rooms, create rooms, list an owner's rooms, and toggle availability |
| `/api/bookings` | Check availability, create bookings, retrieve bookings, and initiate Stripe payment |
| `/api/clerk` | Clerk webhook handling |
| `/api/stripe` | Stripe webhook handling |

The root endpoint (`/`) returns a basic server response. Consult the route files for individual HTTP methods, request bodies, and authentication requirements.

## Authentication and Payments

- Clerk is used for frontend sign-in and backend authentication integration.
- Protected API routes use authentication middleware.
- Stripe handles online payment integration, with a webhook endpoint at `/api/stripe`.
- Configure webhook URLs and signing secrets in the relevant provider dashboards before testing these flows.

## Deployment Notes

The repository includes `client/vercel.json` and `server/vercel.json` configuration files for Vercel. Configure environment variables separately in the hosting platform, set the frontend backend URL to the deployed API, and configure provider webhook URLs for the production environment.

Deployment behavior depends on the Vercel project root and build settings. Verify the client and server deployment configurations in your own Vercel projects before deploying.

## Security Notes

- Keep `.env` files and secret keys out of Git.
- Use restricted, production-appropriate credentials for deployed environments.
- Configure CORS to allow only the origins that should access the API.
- Verify Clerk and Stripe webhook signatures.
- Validate and authorize requests on the server; never rely only on frontend checks.

## Current Scope

This README documents the application structure and integrations visible in the project source. Provider credentials, production URLs, repository URL, and deployment status must be supplied or verified for your environment.
