# GitHub User Search

A React application to search GitHub users with filters (username, location, minimum repositories). Built with Vite, Tailwind CSS, and the GitHub API.

## Local development

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com) and sign in.
2. **Import the project**: Connect your GitHub/GitLab/Bitbucket repo (e.g. `alx-fe-reactjs`), set the **Root Directory** to `github-user-search`, then deploy.
3. **Environment variables** (optional): If you use a GitHub API token, add `VITE_APP_GITHUB_API_KEY` in **Project Settings → Environment Variables** on Vercel. See `.env.example`.
4. **Deploy**: Push to your main branch or trigger a deploy from the Vercel dashboard. Vercel will run `npm run build` and serve the `dist` output.
5. **Verify**: Open the deployed URL and test search, filters, load more, and responsiveness.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
