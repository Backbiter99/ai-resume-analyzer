# 🚀 React Router Full-Stack Template

A modern, production-ready template for building full-stack applications using **React Router**, **TypeScript**, and **Vite**. Designed for speed, scalability, and great developer experience.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

---

## ✨ Features

-   ⚛️ Full-stack React with **React Router**
-   🚀 Server-side rendering (SSR)
-   ⚡️ Hot Module Replacement (HMR)
-   🔄 Built-in data loading and mutations
-   📦 Optimized asset bundling
-   🎨 Preconfigured with **Tailwind CSS**
-   🔐 TypeScript-first setup
-   🧪 Integrated with **React Compiler** and **React Scan**
-   🧠 State management with **Zustand**
-   🖥️ UI components and layout using **Puter.js**
-   📚 [Official React Router Documentation](https://reactrouter.com/)

---

## 🛠️ Getting Started

### 📦 Installation

```bash
npm install
```

### 🔧 Development

Start the development server:

```bash
npm run dev
```

The app will be running at:
**[http://localhost:5173](http://localhost:5173)**

---

## 🏗️ Production Build

To generate an optimized build:

```bash
npm run build
```

The output structure:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side entry point
```

---

## 🚢 Deployment Options

### 📦 Docker

To build and run the app in Docker:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

Supports deployment to:

-   AWS ECS
-   Google Cloud Run
-   Azure Container Apps
-   DigitalOcean App Platform
-   Fly.io
-   Railway

### 🛠️ DIY Node Deployment

Use the built-in app server for production if you're deploying without Docker.
Just deploy the output of `npm run build`.

---

## 🎨 Styling

This template comes with **Tailwind CSS** preconfigured for rapid UI development. You’re free to replace it with your preferred styling framework.

---

## 📹 Credits

Built with ❤️ using [React Router](https://reactrouter.com/).

Inspired by the YouTube tutorial:
📺 [Build Full Stack Web Apps with React Router](https://www.youtube.com/watch?v=iYOz165wGkQ)
by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery)

---

## 🧰 Tech Stack

-   TypeScript
-   React
-   Vite
-   React Router
-   React Compiler
-   React Scan
-   Tailwind CSS
-   Puter.js
-   Zustand

---

Feel free to fork, modify, and use this template in your own projects. Happy hacking! 🚀
