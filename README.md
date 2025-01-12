# Express-Server-TS

This is a backend of online shopping, built with TypeScript and Express.

## Installation

To install the dependencies, run:

```bash
pnpm install
```

## Scripts
start: Builds the project and starts the server.
```bash
pnpm start
```
build: Compiles the TypeScript code.
```bash
pnpm build
```
dev: Starts the server in development mode with hot-reloading.
```bash
pnpm dev
```
## Dependencies

- `@prisma/client`: Prisma Client for database access.
- `bcryptjs`: Library to hash passwords.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library to work with JSON Web Tokens.
- `tsconfig-paths`: Load modules using paths specified in tsconfig.
- `zod`: TypeScript-first schema declaration and validation library.


## Dev Dependencies
- `@types/bcryptjs` : ypeScript definitions for bcryptjs.
- `@types/express` : TypeScript definitions for Express.
- `@types/jsonwebtoken` : TypeScript definitions for jsonwebtoken.
- `prisma` : Prisma ORM for database schema management.
- `ts-node-dev` : TypeScript execution environment with hot-reloading.
- `typescript` : TypeScript language support.

# Project Structure
- `src/`: Source code of the project.
- `dist/`: Compiled JavaScript output.

# Usage

1. **Install dependencies**:  
   Use the following command to install all required dependencies:  
   ```bash
   pnpm install
    ```
2. **Set up the database**:
Follow these steps to configure the database:
- Ensure you have a PostgreSQL database running.
- Set the DATABASE_URL environment variable with your database connection string.
  For example:

  ```bash
  export DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
  ```
- Run Prisma migrations to set up the database schema:
  ```bash
  pnpm prisma migrate dev
  ```
3. **Build the project**:
   - Compile the project for production:
     ```bash
     pnpm build
     ```
4. **Start the server**:
   - Run the server in production mode:
     ```bash
     pnpm start
     ```
5. **For development**:
   - Start the server in development mode:
     ```bash
     pnpm dev
     ```

# Author
`zsskar`
