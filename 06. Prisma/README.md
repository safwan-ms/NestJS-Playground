# Prisma Setup & Installation Guide

Prisma is a next-generation **Node.js and TypeScript ORM** that makes database access easy, type-safe, and efficient. This guide will help you install and configure Prisma in a new or existing project.

---

## 📌 Prerequisites

Before installing Prisma, ensure you have the following installed:

- **Node.js** (v16.x or higher recommended)
- **npm**, **yarn**, or **pnpm** as your package manager
- A **database** (PostgreSQL, MySQL, SQLite, MongoDB, SQL Server, CockroachDB, etc.)

---

## 🚀 Installation

### 1. Initialize a Node.js project

If you don’t already have a project, create one:

```bash
mkdir prisma-example
cd prisma-example
npm init -y
```

---

### 2. Install Prisma

Install Prisma CLI as a development dependency:

```bash
npm install prisma --save-dev
```

Install the Prisma Client (runtime dependency):

```bash
npm install @prisma/client
```

---

### 3. Initialize Prisma

Run the following command to set up Prisma in your project:

```bash
npx prisma init
```

This will create:

- **`prisma/schema.prisma`** → Main Prisma schema file
- **`.env`** → Environment variables (database connection URL, etc.)

---

## ⚙️ Configuration

### 1. Set Database URL

Inside your `.env` file, set your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb?schema=public"
```

Example for different databases:

- **PostgreSQL**  
  `postgresql://user:password@localhost:5432/mydb?schema=public`

- **MySQL**  
  `mysql://user:password@localhost:3306/mydb`

- **SQLite**  
  `file:./dev.db`

- **MongoDB**  
  `mongodb+srv://user:password@cluster.mongodb.net/mydb`

---

### 2. Define Your Data Models

Open `prisma/schema.prisma` and define your database schema. Example:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

---

## 🛠️ Migrate Database

Run the following command to apply your schema to the database:

```bash
npx prisma migrate dev --name init
```

This will:

- Create a migration file under `prisma/migrations`
- Apply it to your database
- Generate the Prisma Client

---

## 📦 Using Prisma Client

Once migrations are applied, you can use Prisma Client in your code.

Example with **TypeScript / Node.js**:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });

  // Fetch all users
  const allUsers = await prisma.user.findMany();

  console.log({ user, allUsers });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

---

## 🔎 Helpful Commands

- **Initialize Prisma**

  ```bash
  npx prisma init
  ```

- **Run migrations**

  ```bash
  npx prisma migrate dev --name migration_name
  ```

- **Push schema without migrations (for prototyping)**

  ```bash
  npx prisma db push
  ```

- **Open Prisma Studio (GUI for DB)**

  ```bash
  npx prisma studio
  ```

- **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma GitHub](https://github.com/prisma/prisma)
- [Prisma Examples](https://github.com/prisma/prisma-examples)

---

✅ You now have Prisma installed, configured, and ready to use!
