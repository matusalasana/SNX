import { db } from "../index.ts";
import { projects } from "../schema/projects";

export const seedProjects = async () => {
  try {
    const data = [
      {
        title: "SNX Portfolio",
        category: "Full Stack",
        tags: [
          "React",
          "TypeScript",
          "Express",
          "PostgreSQL",
          "Drizzle ORM",
        ],
        thumbnailUrl: "https://picsum.photos/800/600?random=1",
        featured: true,
        description:
          "A modern developer portfolio platform built with React, Express, PostgreSQL, and Drizzle ORM.",
        githubUrl: "https://github.com/example/snx-portfolio",
        liveUrl: "https://snx-demo.vercel.app",
        order: 1,
      },
      {
        title: "Expense Tracker",
        category: "Full Stack",
        featured: true,
        tags: [
          "React",
          "Node.js",
          "Express",
          "PostgreSQL",
        ],
        thumbnailUrl: "https://picsum.photos/800/600?random=2",
        description:
          "Personal finance management application with budgeting and transaction tracking.",
        githubUrl: "https://github.com/example/expense-tracker",
        liveUrl: "https://expense-demo.vercel.app",
        order: 2,
      },
      {
        title: "E-Commerce API",
        category: "Backend",
        featured: true,
        tags: [
          "Node.js",
          "Express",
          "PostgreSQL",
          "JWT",
        ],
        thumbnailUrl: "https://picsum.photos/800/600?random=3",
        description:
          "RESTful API for e-commerce platforms with authentication, products, and order management.",
        githubUrl: "https://github.com/example/ecommerce-api",
        liveUrl: null,
        order: 3,
      },
      {
        title: "Task Management App",
        featured: false,
        category: "Frontend",
        tags: [
          "React",
          "TypeScript",
          "TailwindCSS",
        ],
        thumbnailUrl: "https://picsum.photos/800/600?random=4",
        description:
          "Kanban-style task management application with drag-and-drop functionality.",
        githubUrl: "https://github.com/example/task-manager",
        liveUrl: "https://task-demo.vercel.app",
        order: 4,
      },
      {
        title: "Inventory Management System",
        category: "Full Stack",
        featured: false,
        tags: [
          "React",
          "Express",
          "PostgreSQL",
          "Docker",
        ],
        thumbnailUrl: "https://picsum.photos/800/600?random=5",
        description:
          "Inventory and stock management system for small and medium-sized businesses.",
        githubUrl: "https://github.com/example/inventory-system",
        liveUrl: "https://inventory-demo.vercel.app",
        order: 5,
      },
    ];

    return await db
      .insert(projects)
      .values(data)
      .returning();
  } catch (err) {
    console.log(err.cause || err.message);
  }
};