
# SNX - portfolio website

# Overall Architecture 
```bash

Frontend (React + Vite)
        ↕ REST API (Axios)
Backend (Node + Express + TS)
        ↕
MongoDB (Mongoose)
```

```bash
backend/
 ├── src/
 │   ├── config/
 │   │   └── db.ts
 │   │
 │   ├── models/
 │   │   ├── User.model.ts
 │   │   ├── Project.model.ts
 │   │   └── Message.model.ts
 │   │
 │   ├── controllers/
 │   │   ├── auth.controller.ts
 │   │   ├── project.controller.ts
 │   │   └── message.controller.ts
 │   │
 │   ├── routes/
 │   │   ├── auth.routes.ts
 │   │   ├── project.routes.ts
 │   │   └── message.routes.ts
 │   │
 │   ├── middleware/
 │   │   ├── auth.middleware.ts
 │   │   └── error.middleware.ts
 │   │
 │   ├── services/
 │   │   ├── auth.service.ts
 │   │   ├── project.service.ts
 │   │   └── message.service.ts
 │   │
 │   ├── utils/
 │   │   ├── jwt.ts
 │   │   ├── hash.ts
 │   │   └── ApiError.ts
 │   │
 │   ├── app.ts
 │   └── server.ts 
 ```