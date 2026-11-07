# SNX Portfolio

A full-stack developer portfolio with a public site (projects, blog, experience, skills, certifications, contact form) and a private admin dashboard for managing all of that content.

**Live site:** [sana-matusala-portfolio.vercel.app](https://sana-matusala-portfolio.vercel.app)

---

## Features

### Public site

- Responsive UI with light/dark theme toggle
- Home page with hero, summary, services, skills, experience, certifications, featured projects and recent blogs
- Projects list and project detail pages
- Blog list and article pages with Markdown rendering (sanitized with DOMPurify)
- About and Contact pages with a message form
- Downloadable resume

### Admin dashboard

- Cookie-based JWT authentication; the login page lives at a configurable URL
- CRUD for projects, blogs, categories, skills, experiences and certifications
- Inbox for messages sent through the contact form
- Image uploads (thumbnails, screenshots) stored on Cloudinary

---

## Tech stack

| Layer      | Tools |
| ---------- | ----- |
| Frontend   | React 19, TypeScript, Vite, React Router 7, TanStack Query, React Hook Form + Zod, Tailwind CSS 4 + daisyUI, Framer Motion, Axios |
| Backend    | Node.js, Express 4, TypeScript, Drizzle ORM, PostgreSQL (`pg` / Neon), JWT + bcrypt, Zod, Multer, Helmet, CORS |
| Media      | Cloudinary |
| Deployment | Vercel (frontend), Render (backend), Neon (PostgreSQL) |

---

## Project structure

```
SNX/
├── client/                  # React + Vite app
│   ├── public/              # Static assets (photo, resume)
│   ├── vercel.json          # Rewrites /api to the backend
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # admin/, auth/, common/, forms/, home/
│       ├── context/         # Theme context
│       ├── hooks/           # TanStack Query hooks per resource
│       ├── layouts/
│       ├── pages/           # public/ and admin/
│       ├── routes/          # Router and protected routes
│       ├── schema/          # Zod schemas
│       └── types/
│
├── server/                  # Express API
│   ├── drizzle.config.ts
│   └── src/
│       ├── configs/         # env and Cloudinary setup
│       ├── db/              # Drizzle client, schema/, reset script
│       ├── middleware/      # auth, upload, validation, logging
│       ├── modules/         # auth, admin, projects, blogs, categories,
│       │                    # skills, experiences, certifications, messages
│       │                    #   each: controller / service / repository /
│       │                    #         routes / validation
│       ├── routes/          # Mounts all modules under /api/v1
│       ├── app.ts
│       └── server.ts
│
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js 20+ and npm
- A PostgreSQL database (a free [Neon](https://neon.tech) project works well)
- A [Cloudinary](https://cloudinary.com) account for image uploads

### 1. Clone and install

```bash
git clone https://github.com/matusalasana/SNX.git
cd SNX

cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

**`server/.env`**

| Variable                | Required | Default                 | Description |
| ----------------------- | -------- | ----------------------- | ----------- |
| `JWT_SECRET`            | yes      | n/a                     | Secret used to sign auth tokens. The server refuses to start without it. |
| `DATABASE_URL`          | yes      | n/a                     | PostgreSQL connection string |
| `CLIENT_ORIGIN`         | yes      | n/a                     | Allowed frontend origin for CORS, e.g. `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | yes      | n/a                     | Cloudinary credentials |
| `CLOUDINARY_API_KEY`    | yes      | n/a                     | |
| `CLOUDINARY_API_SECRET` | yes      | n/a                     | |
| `PORT`                  | no       | `3000`                  | API port |
| `SERVER_ORIGIN`         | no       | `http://localhost:3000` | Public URL of the API |
| `COOKIE_MAX_AGE`        | no       | 7 days (ms)             | Auth cookie lifetime in milliseconds |
| `PWD_SALT_ROUNDS`       | no       | `12`                    | bcrypt salt rounds |

**`client/.env`**

```bash
VITE_ADMIN_LOGIN_URL=/your-secret-login-path
```

The API base URL is not an environment variable. In development the client calls `http://localhost:3000/api/v1`. In production it calls `/api/v1`, which `client/vercel.json` rewrites to the backend so that auth cookies stay first-party.

### 3. Set up the database

From `server/`:

```bash
npm run push        # push the Drizzle schema to the database
# or
npm run generate    # generate SQL migrations
npm run migrate     # apply migrations
```

`npm run schema:drop` drops and recreates the `public` schema. It deletes all data, so use it only on a database you can afford to wipe.

### 4. Run locally

```bash
# terminal 1: API on http://localhost:3000
cd server && npm run dev

# terminal 2: client on http://localhost:5173
cd client && npm run dev
```

---

## Scripts

### Client (`client/`)

| Command           | Description |
| ----------------- | ----------- |
| `npm run dev`     | Start the Vite dev server |
| `npm run build`   | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint |

### Server (`server/`)

| Command              | Description |
| -------------------- | ----------- |
| `npm run dev`        | Start with `tsx watch` |
| `npm run build`      | Bundle with `tsup` into `dist/` |
| `npm start`          | Run the built server |
| `npm run check`      | Type-check without emitting |
| `npm run generate`   | Generate Drizzle migrations |
| `npm run migrate`    | Apply migrations |
| `npm run push`       | Push schema directly to the database |
| `npm run schema:drop`| Drop and recreate the `public` schema |

---

## API overview

All routes are mounted under `/api/v1`:

`/auth` · `/projects` · `/categories` · `/blogs` · `/skills` · `/experiences` · `/certifications` · `/messages` · `/admin`

Read endpoints are public. Write endpoints require a valid auth cookie issued by `/auth`.

---

## Media management

Uploads go through Multer to Cloudinary. Project and blog thumbnails and project screenshots are stored there, and only the resulting URLs are saved in the database.

---

## Deployment

- **Frontend:** Vercel, with the project root set to `client/`
- **Backend:** Render, running `npm run build` then `npm start` in `server/`
- **Database:** Neon PostgreSQL

Set the server environment variables on Render and `VITE_ADMIN_LOGIN_URL` on Vercel. Update the rewrite destination in `client/vercel.json` if the backend URL changes.

---

## Roadmap

- Search and project filtering
- Blog comments
- Analytics dashboard
- Newsletter integration
- Internationalization (i18n)
- Automated tests

---

## Contributing

Issues and pull requests are welcome. Fork the repo, create a branch, and open a PR.

---

## Contact

[Website](https://sana-matusala-portfolio.vercel.app) ·
[GitHub](https://github.com/matusalasana) ·
[LinkedIn](https://www.linkedin.com/in/sana-matusala-b111a7366) ·
[Telegram](https://t.me/sana1514)
