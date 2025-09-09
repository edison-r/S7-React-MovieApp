
# 🎬 TMDB Movies App

This project is a movie app built with **Astro, React** and **Supabase.**
It allows registered users to explore movies from the TMDB API, view details such as cast.

If you wanna take a look: https://yourmovieapp.vercel.app/

You need to register to be able to navigate, if you don't want to register you can also use this: 
email:`test@mail.com`
pass: `123456`

## Preview

[![Demo Video](https://github.com/edison-r/S7-React-MovieApp/blob/main/demo_archives/yourmoviesapp_preview.jpg)]()

## Technologies used
[![My Skills](https://skillicons.dev/icons?i=vite,html,css,tailwind,astro,ts,react,supabase,figma,vscode,git,github)](https://skillicons.dev)

- Astro + React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth
- TMDB API
- Typed with interfaces (types.ts)

## Features

**Movie Grid**

- Displays popular movies in an infinite scroll grid.
- Hover effects with shadows and smooth animations.

**Movie Details**

- Individual movie pages with overview, release date, runtime, rating.
- Cast section with actor modal for biography and info.
- Planned: trailers and related recommendations.

**Authentication**

- User registration and login with Supabase.
- Modal login/register UI with session handling.
- Protected /movies route (only available for logged-in users).

**UI / UX**

- Animated Navbar that shrinks on scroll.
- Welcome landing page with background slideshow and custom fonts.
- Toast notifications on registration.
- Mobile-friendly modals with scroll lock.

## Getting started

**Clone this repository**

```
git clone git@github.com:your-username/tmdb-movies-app.git
```

**Install dependencies**

```
npm install
```

**Set up Enviroment Variables**

Create a `.env`file in the project root:
```
PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
PUBLIC_TMDB_KEY=your_tmdb_api_key
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
````

**Start Development Server**

```
npm run dev
```

## Project Structure
```
📁 src
├── components/          ← Shared UI elements (Navbar, Modals, etc.)
├── features/movies/     ← Movie-related components (MovieCard, MovieGrid, MovieRow…)
├── hooks/               ← Custom React hooks (useInfiniteScroll, useProtectedRoute…)
├── layouts/             ← Layouts for Astro pages
├── pages/               ← Astro pages (index, movies, etc.)
├── services/            ← API services (tmdb, fetchData)
├── interfaces/          ← TypeScript interfaces
├── styles/              ← Global and Tailwind styles
└── lib/                 ← Supabase client and utilities
```

## Next Steps / To-do

- Add movie trailers to detail pages.
- Implement “favorites” saved per user (Supabase).
- Add search and genre-based discovery.
- Polish mobile navigation and UI transitions.

## My Dev Journal

This project is the first one using Astro + React. I think I did it pretty well and i reaaaally liked Astro. I also integrated the TMDB API and protected routes with Supabase auth.

One of the parts I enjoyed the most was building the movie browsing experience: infinite scroll for popular movies, horizontal carousels for top rated, and the actor modal with biography and details. They might sound like small features, but they made the app feel interactive and closer to a real product. Adding animations with Framer Motion also gave the UI more personality — from hover effects on cards to smooth modal transitions.

Another big learning curve was authentication. Integrating Supabase taught me not just about login and sessions, but also about protecting routes and considering about UX details like showing a toast on signup or trimming the email for display. These small improvements made the app more polished and user-friendly.

What should we watch next? 👀🍿

## Project Status
![Static Badge](https://img.shields.io/badge/Status-Completed-green?style=flat)
