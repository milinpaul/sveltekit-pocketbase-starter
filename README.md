# SvelteKit + PocketBase Starter Kit

This repository serves as a starter kit for quickly building applications with the latest [SvelteKit](https://kit.svelte.dev/) and [PocketBase](https://pocketbase.io/). Clone the repo, set up the dependencies, and kickstart your project effortlessly!

---

## Features
- **SvelteKit**: A modern and fast web development framework.
- **PocketBase**: A self-hosted backend with a database, user authentication, and file storage.
- Preconfigured structure to speed up development.
- Clean and minimal setup for easy customization.

---

## Tech Stack
| Technology   | Version       | Comments                           |
|--------------|---------------|------------------------------------|
| SvelteKit    | 2.15.2        | Frontend framework                |
| PocketBase   | 0.22.25        | Backend for authentication, DB, and storage |

---

## Getting Started

Follow these steps to get your project running locally:

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) for dependency management
- [PocketBase CLI](https://pocketbase.io/docs/) (optional for local backend setup)

### Clone the Repository
```bash
git clone git@github.com:milinpaul/sveltekit-pocketbase-starter.git
cd sveltekit-pocketbase-starter
```

### Install Dependencies
Using npm:
```bash
npm install
```
Or using pnpm:
```bash
pnpm install
```

### Start the Development Server
Run the SvelteKit development server:
```bash
npm run dev
```
Visit the app at `http://localhost:5173` (or as indicated in the console output).

---

## How to Deploy PocketBase on [fly.io](https://fly.io/).

I used to deploy the pocketbase on fly.io for free. You could follow [this link](https://github.com/pocketbase/pocketbase/discussions/537) to host pocketbase on fly.io.

Since [Fly.io](https://fly.io/) uses docker for app deployment, we created a [**Dockerfile**](https://github.com/milinpaul/sveltekit-pocketbase-starter/blob/main/Dockerfile) for easy deployment.

Checkout the [**offical doc**](https://pocketbase.io/docs/going-to-production/#using-docker) for more info and also checkout the official [**Going to production**](https://pocketbase.io/docs/going-to-production/) doc.

---

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure code quality and proper documentation with your submission.

---

Happy coding! 🚀
