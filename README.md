# Portfolio Project

This repository contains a personal portfolio built with Vite and React.
It is set up so you can work locally, make changes quickly, and keep the codebase easy to maintain.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm available in your terminal

### Install Dependencies

From the project root, run:

```bash
npm install
```

## Development

Start the local development server with:

```bash
npm run dev
```

Vite will print the local URL in the terminal. Open that address in your browser to view the site.

## Build

Create a production build with:

```bash
npm run build
```

## Preview

To preview the production build locally:

```bash
npm run preview
```

## Linting

To check the code quality of the project:

```bash
npm run lint
```

To automatically fix lint issues where possible:

```bash
npm run lint:fix
```

## Project Structure

- `src/` - application source code
- `src/components/` - reusable UI and page sections
- `src/api/` - API-related helpers and clients
- `public/` - static assets, if used

## Notes

- Keep environment-specific values in `.env.local`
- Avoid committing secrets or machine-specific configuration
- Use the existing scripts in `package.json` for everyday development tasks
