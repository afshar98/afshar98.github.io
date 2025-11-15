# 📁 Mohammad Afshar — Portfolio  
_A modern, interactive, terminal-style portfolio built using **Vite**, **React**, **TypeScript**, **TailwindCSS**, and **Motion**._

This project showcases my resume, blog engine, contact form, and an interactive terminal UI with a clean animated design. The site is fully responsive, lightweight, and built with component-driven architecture.

---

## 🚀 Features

### 🖥️ Interactive Terminal Homepage
- Fully functional CLI-like UI  
- Supported commands:
  ```bash
  ls
  help
  clear / cls
  cd resume
  cd blogs
  cd contact
  ```
- Autocomplete with **Tab**
- Command history (**↑ / ↓**)
- Typing animation
- PickerWheel (scroll suggestion selector)

### 📄 Resume Page
- Terminal-inspired design  
- Smooth animations powered by **motion/react**
- Download + View PDF  
- Sections: Experience, Education, Skills, Languages

### 📰 Blogs System
- `/blogs` — List of blog posts  
- `/blogs/:slug` — Blog detail  
- Markdown-ready architecture

### ✉️ Contact Page
- Email form with validation  
- **EmailJS** integration via environment variables  
- Automatic fallback to `mailto:`  
- Animated form states: sending, success, error

### 🎡 PickerWheel Component
- Scroll-based spinning selector  
- Keyboard navigation  
- Motion-powered transitions

---

## 🛠️ Tech Stack

### Core
- React 18  
- TypeScript  
- Vite  
- React Router v6  
- TailwindCSS  
- shadcn/ui

### Animation
- motion/react (Framer Motion v3)

### Email/Contact
- EmailJS (optional)

---

## ▶️ Running Locally

### 1️⃣ Clone the project

```bash
git clone https://github.com/afshar98/afshar98.github.io
cd afshar98.github.io
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start dev server

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

### 5️⃣ Preview production build

```bash
npm run preview
```

---

## 📤 Deployment

Fully compatible with:

- Vercel  
- Netlify  
- GitHub Pages  
- Cloudflare Pages  

---


## 👨‍💻 Author

**Mohammad Afshar**  
Frontend Developer — React / Next.js / TypeScript  

- LinkedIn: https://www.linkedin.com/in/afshar98  
- GitHub: https://github.com/afshar98  
- Email: mo.afshar1998@gmail.com  