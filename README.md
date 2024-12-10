# CMS Dashboard

A modern CMS dashboard built with **Next.js** and configured with optional tools for an optimal development experience.

## Documentation

For a comprehensive guide on setting up **Next.js** with **pnpm**, check out this article:  
[How to Install Next.js with pnpm](https://medium.com/frontendweb/how-to-install-nextjs-with-pnpm-a958f1b3e9ad)


## File structure

```
src/
- api/
  - config.ts: Configuration file for API (reads from `.env`)
  - login.ts: Handles login API requests
  - business.ts: Mock or API for business data
  - news.ts: Mock or API for news data

- app/
  - business/
    - page.tsx
  - content/
    - page.tsx
  - message/
    - page.tsx
  - login/
    - layout.tsx: Layout for the login page (handles metadata)
    - page.tsx: Login page with UI and authentication logic
  - client-layout.tsx: Client-side layout logic (handles conditional rendering of Sidebar)
  - layout.tsx: Root layout for the app
  - not-found.tsx
  - page.tsx: Home page (Dashboard)

- components/
  - layout/
    - navItems.ts: Defines navigation structure with categories, links, icons, and descriptions for Sidebar.
    - Sidebar.tsx
  - cards/
    - BusinessCard.tsx
    - ContentCard.tsx
  - modals/
    - BusinessEditModal/
      - ...forms
      - index.tsx
    - ContentEditModal/
      - ...forms
      - index.tsx
  - SearchAndFilter.tsx

- utils/
  - authStorage.ts: Utility for handling authentication tokens
  - formatDate.ts

- types/
  - businessTypes.ts
  - contentTypes.ts

- pnpm-lock.yaml: Lockfile for dependencies managed by pnpm
- tailwind.config.ts: Tailwind CSS configuration
- .env.example: Example environment variables file, used for providing a template for environment variables
- .env.local: Local environment variables file, specific to the developer’s machine (not tracked by git)
```

## Commands

### Create a new Next.js application using pnpm:
```bash
pnpm create next-app

pnpm add react-icons
```

## Example Configuration

Here is an example of the setup for the `cms-dashboard` project:

```plaintext
✔ What is your project named? … cms-dashboard
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for next dev? … Yes
✔ Would you like to customize the import alias (@/* by default)? … Yes
✔ What import alias would you like configured? … @/*
```
