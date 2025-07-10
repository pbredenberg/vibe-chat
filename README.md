# Vibe Chat

Vibe Chat is a modern, real-time chat application built with React, TypeScript, Vite, Supabase, Redux Toolkit, RTK Query, and Tailwind CSS. It features user authentication, public and private chat management, and a clean, responsive UI.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **State Management:** Redux Toolkit, RTK Query
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage)
  - **Docker Desktop:** Required for the local supabase instance
- **API:** Supabase client (supabase-js)
- **Routing:** React Router
- **Deployment:** Netlify (SPA redirects supported)

## Features

- User authentication (sign up, log in, log out) with Supabase Auth
- Profile management
- Public chat list and individual chat pages
- Authenticated users can create, edit, and delete their own chats
- Responsive, accessible UI with Tailwind CSS

## Developer Setup

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd vibe-chat
```

### 2. Set Node.js version (recommended)

This project includes a [`.nvmrc`](./.nvmrc) file specifying the required Node.js version. If you use [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm use
```

### 3. Install dependencies

```sh
npm install
```

### 4. Set up environment variables

- Copy `.env` from `example.env`:
- Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with your Supabase project credentials.
- **Tip:** After running `npx supabase start`, the required Supabase environment variables (URL and anon key) will be displayed in your terminal output. Copy these values into your `.env` file. See the next step.

### 5. Start Supabase locally

- The Supabase CLI is installed as a dev dependency. Use `npx` to run all Supabase commands:
- Start Supabase: `npx supabase start`
- This will launch the local database, API, Auth, and Studio. You can access Supabase Studio at [http://localhost:54323](http://localhost:54323).

### 6. Start the development server

```sh
npm run dev
```

## Notes

### Netlify SPA Redirects

A `_redirects` file is included in `public/` to support client-side routing on Netlify:

```text
/*    /index.html   200
```

---

For more details on customizing the stack or deploying to production, see the documentation for each tool or reach out to the maintainers.
