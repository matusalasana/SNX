# 🚀 SNX Portfolio

A modern full-stack developer portfolio built to showcase projects, technical skills, blog content, and professional experience through a fast, responsive, and scalable web application.

### 🌐 Live Demo 

Visit the live website:

[http://sana-matusala-portfolio.vercel.app](https://sana-matusala-portfolio.vercel.app)

---

## ✨ Features

### Public Features

- Responsive modern UI
- Project showcase with detailed project pages
- Blog platform with article details pages
- Featured projects and featured articles
- Technology tags and categorization
- Contact section
- Dark theme design
- Optimized performance and SEO-friendly structure

### Admin Features

- Secure authentication
- Create, update, and delete projects
- Create, update, and delete blog posts
- Upload thumbnails and multiple project screenshots
- Manage featured content
- Cloudinary image storage integration

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- React Router
- React Hook Form
- Zod
- TanStack Query
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- JWT Authentication
- Multer
- Cloudinary

### Deployment

- Vercel (Frontend)
- Render (Backend)
- Neon PostgreSQL

---

## 📁 Project Structure

```bash
snx/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schema/
│   │   └── types/
│   └── public/
│
├── server/
│   └── src/
│       │   
│       ├── configs/
│       ├── db/
│       ├── middleware/
│       ├── modules/
│       │   ├── projects.controller.ts
│       │   ├── projects.service.ts
│       │   ├── projects.repository.ts
│       │   ├── projects.routes.ts
│       │   └── projects.validation.ts
│       ├── routes/
│       ├── types/
│       ├── utils/
│       ├── app.ts
│       └── server.ts
│
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend
```bash
VITE_API_URL=http://localhost:3000/api/v1
```

### Backend
```bash
PORT=3000

DATABASE_URL=your_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```
---

## Installation 

### Clone the repository
```bash
git clone https://github.com/yourusername/snx.git

cd snx
```

### Install dependencies

Frontend
```bash
cd client
npm install
```

Backend
```bash
cd server
npm install
```

---

### Database Setup



```bash
# Generate migrations:
npm run generate

# Push schema:
npm run push

# Seed data
npm run seed

# Reset DB
npm run reset
```

---

▶️ Running the Application

Backend
```bash
npm run dev
```

Frontend
```bash
npm run dev
```

---

## Media Management

Project thumbnails and screenshots are uploaded through Cloudinary.

```bash
Folder structure:

projects/
├── thumbnails/
└── images/

blogs/
├── thumbnails/
```

---

## Authentication

Admin routes are protected using JWT-based authentication.

Protected actions include:

- Creating projects
- Updating projects
- Deleting projects
- Creating blogs
- Updating blogs
- Deleting blogs

---

## Future Improvements

- Project analytics dashboard
- Search functionality
- Blog comments
- Project filtering
- Markdown editor
- Newsletter integration
- Internationalization (i18n)
- Automated testing

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

## 📬 Contact

If you'd like to collaborate, discuss opportunities, or provide feedback:

# 🚀 SNX Portfolio

[Live Website](https://sana-matusala-portfolio.vercel.app) •
[GitHub](https://github.com/matusalasana) •
[LinkedIn](https://www.linkedin.com/in/sana-matusala-b111a7366)
[Telegram](t.me/sana1514)


---

Built with ☕, TypeScript, and a lot of persistence.