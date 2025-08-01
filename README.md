# **Resume Reject**

A modern resume analyzer application built with **React Router**, **Zustand**, and **Puter.js** for fast, interactive, and user-friendly experiences.

**Live Demo:** [https://resume-reject.netlify.app/](https://resume-reject.netlify.app/)

---

## **✨ Features**

-   ⚛ **Full-stack React** with **React Router**
-   🚀 **Server-Side Rendering (SSR)** for better SEO & performance
-   ⚡ **Hot Module Replacement (HMR)** for instant feedback during development
-   🔄 **Built-in Data Loading & Mutations** using React Router's data APIs
-   📦 **Optimized Asset Bundling** with Vite
-   🎨 **Tailwind CSS** for rapid, responsive UI design
-   🔐 **TypeScript-First Setup** for robust and scalable code
-   🧪 **React Compiler** and **React Scan** integration
-   🧠 **Zustand** for lightweight and intuitive state management
-   🖥 **Puter.js** for UI components and layouts
-   📚 Easy reference with the [Official React Router Documentation](https://reactrouter.com/)

---

## **🛠 Getting Started**

### **1. Installation**

```bash
npm install
```

### **2. Development**

Run the local development server:

```bash
npm run dev
```

Your app will be live at:
**[http://localhost:5173](http://localhost:5173)**

---

## **🏗 Production Build**

Generate an optimized production build:

```bash
npm run build
```

**Output structure:**

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side entry point
```

---

## **🚢 Deployment**

### **Docker**

Build and run with Docker:

```bash
docker build -t resume-reject .
docker run -p 3000:3000 resume-reject
```

Supported platforms:

-   AWS ECS
-   Google Cloud Run
-   Azure Container Apps
-   DigitalOcean App Platform
-   Fly.io
-   Railway

### **Manual Node.js Deployment**

If not using Docker, deploy the `build` folder generated by `npm run build` with a Node.js server.

---

## **🎨 Styling**

This project comes preconfigured with **Tailwind CSS** for fast, responsive design.
You can customize or replace it with any styling framework of your choice.

---

## **📹 Credits**

Built with ❤️ using [React Router](https://reactrouter.com/).

Inspired by the tutorial:
📺 [Build Full Stack Web Apps with React Router](https://www.youtube.com/watch?v=iYOz165wGkQ)
by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery).

---

## **🧰 Tech Stack**

-   TypeScript
-   React + Vite
-   React Router (v7)
-   React Compiler & React Scan
-   Tailwind CSS
-   Zustand
-   Puter.js

---

### **🚀 Fork, Modify & Hack Away!**

Feel free to fork this repository, customize it, and use it for your own projects.

---
