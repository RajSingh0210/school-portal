## School Portal

Two pages app:
- `addSchool`: add a school with image upload (validated with react-hook-form + zod)
- `showSchools`: list schools like product cards (name, address, city, image)

### Requirements
- Node 18+
- MySQL 8+

### 1) Configure database
Create a MySQL database, e.g. `schools_db`, and a user with privileges.

Set `DATABASE_URL` in `.env` (already created by Prisma) like:

```
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/schools_db"
```

### 2) Migrate schema and generate client

```
npx prisma migrate dev --name init
npx prisma generate
```

### 3) Run the app

```
npm run dev
```

Open `http://localhost:3000`.

### Deploying to Vercel with uploads
- Set env vars in Vercel Project Settings:
  - `DATABASE_URL` (to your hosted MySQL)
  - `BLOB_READ_WRITE_TOKEN` (from Vercel > Storage > Blob)
- The API uploads images to Vercel Blob storage and saves the public URL in DB.

### API
- `POST /api/schools` (multipart/form-data): fields `name,address,city,state,contact,email_id,image`
- `GET /api/schools`: list all schools

Images are saved under `public/schoolImages`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
