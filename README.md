# CMS Dashboard

A modern CMS dashboard built with **Next.js** and configured with optional tools for an optimal development experience.

## Documentation

For a comprehensive guide on setting up **Next.js** with **pnpm**, check out this article:  
[How to Install Next.js with pnpm](https://medium.com/frontendweb/how-to-install-nextjs-with-pnpm-a958f1b3e9ad)


## File structure
src/
- **api/**  
  - **login.ts**: Handles login API requests
  - **config.ts**: Configuration file for API (reads from `.env`).  
  - **news.ts**: Mock or API for news data.  

- **app/**  
  - **login/page.ts**: Login page with UI and authentication logic
  - **layout.tsx**
  - **page.tsx**

- **components/**  
  - **layout/**  
    - **Sidebar.tsx**
  - **EditModal.tsx**
  - **NewsCard.tsx**
  - **SearchAndFilter.tsx**

- **utils/**  
  - **authStorage.ts**: Utility for handling authentication tokens
  - **formatDate.ts**

- **types.ts**: TypeScript types and interfaces.  
- **pnpm-lock.yaml**: Lockfile for dependencies managed by pnpm.  
- **tailwind.config.ts**
- **.env.example**  
- **.env.local**: file .local (not tracked by git).  


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
