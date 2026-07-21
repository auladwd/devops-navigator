# 🚀 DevOps Navigator

<div align="center">

![DevOps Navigator](https://img.shields.io/badge/DevOps-Navigator-00ff88?style=for-the-badge&logo=rocket&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**একটি সম্পূর্ণ DevOps শেখার Interactive Dashboard**

*A comprehensive DevOps learning hub with roadmap, command references, CI/CD visualizer, concept cards, quiz, and notes — all in one place.*

[🌐 Live Demo](#) · [📋 Features](#-features) · [🛠️ Tech Stack](#️-tech-stack) · [🚀 Getting Started](#-getting-started)

</div>

---

## 📸 Preview

> **Dark-themed, terminal-inspired UI** with glassmorphism cards, smooth animations, and a DevOps-hacker aesthetic.

```
┌─────────────────────────────────────────────────────────┐
│  🚀 DevOps Navigator          |  📊 Dashboard           │
│  ─────────────────────        |  ─────────────────────  │
│  📊 Dashboard                 |  Stats | Pipeline | Tips │
│  🗺️  Learning Roadmap          |                         │
│  📋 Command Reference         |  CI/CD Flow:            │
│  🔄 CI/CD Pipeline            |  💻→⚙️→🧪→📦→🚀         │
│  💡 Concepts Cards            |                         │
│  🧠 Quiz                      |  Quick Commands         │
│  📝 My Notes                  |  Docker | K8s | Git...  │
│                               |                         │
│  ████████░░  75%              |                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 📊 Dashboard
- **Stats Overview** — সামগ্রিক অগ্রগতি, completed topics, command count
- **CI/CD Pipeline Flow** — Visual animated pipeline diagram (Code → Build → Test → Deploy)
- **Terminal Widget** — Real pipeline execution simulation
- **Quick Commands** — Most-used DevOps commands-এ one-click access
- **Daily Tips** — Auto-rotating DevOps best practice tips (প্রতি ৬ সেকেন্ডে নতুন tip)
- **Live Clock** — Real-time clock display

### 🗺️ Learning Roadmap
৬টি phase-এ সম্পূর্ণ DevOps শেখার পথ, **৪০+ topics** সহ:

| Phase | বিষয় | Topics |
|-------|-------|--------|
| 01 | 🐧 Linux & Networking | Command Line, File System, Bash Scripting, SSH |
| 02 | 🌿 Git & GitHub | Branching, GitFlow, Pull Requests, GitHub Actions |
| 03 | 🐳 Docker | Dockerfile, Compose, Networking, Volumes, Registry |
| 04 | 🔄 CI/CD Pipelines | GitHub Actions, Jenkins, GitLab CI, Testing |
| 05 | ☁️ Cloud & IaC | AWS, Terraform, Ansible, Security |
| 06 | ☸️ Kubernetes & Monitoring | K8s, Helm, Prometheus, Grafana, ELK |

- ✅ **Checkbox দিয়ে progress track** করুন
- 💾 **LocalStorage-এ save** — browser বন্ধ করলেও মনে থাকে
- 📊 **Per-phase progress bar** — প্রতিটি phase-এর শতাংশ দেখা যায়
- 🔽 **Collapsible phases** — পরিপাটি এবং focused view

### 📋 Command Reference
**১৬টি ready-to-use command card** নিচের category-তে:

| Category | Commands |
|----------|----------|
| 🐳 Docker | Build, Run, Compose, Push, Manage |
| ☸️ Kubernetes | Deploy, Debug, Scale, Update |
| 🌿 Git | Branching, Rebase, History |
| 🐧 Linux | File Ops, Process, Networking, SSH |
| 🔄 CI/CD | GitHub Actions, Jenkins Pipeline |
| ☁️ AWS/IaC | AWS CLI, Terraform |

- 🔍 **Real-time search** — যেকোনো command instant filter
- 🏷️ **Category filter tabs** — Docker, K8s, Git, Linux, CI/CD, AWS
- 📋 **One-click Copy** — clipboard-এ copy করুন সঙ্গে সঙ্গে
- 🎨 **Syntax highlighting** — commands, flags, strings আলাদা রঙে

### 🔄 CI/CD Pipeline Visualizer
- **Visual Stage Cards** — Source → Build → Test → Security → Package → Deploy
- **Animated Status** — DONE ✓, RUNNING ⟳, WAITING ⏳ indicators
- **Sample GitHub Actions YAML** — Real-world workflow example
- **Stage Explanations** — প্রতিটি stage কী করে বাংলায় ব্যাখ্যা

### 💡 DevOps Concepts (Flip Cards)
**৮টি flip card** — hover বা click করলে বাংলায় ব্যাখ্যা দেখা যায়:

> Docker · Kubernetes · CI/CD · IaC · Monitoring · DevSecOps · GitOps · Service Mesh

- 🔄 **3D Flip Animation** — CSS perspective transform
- 📖 **বাংলায় ব্যাখ্যা** + practical example
- 🖱️ **Hover বা Click** — উভয়েই কাজ করে

### 🧠 DevOps Quiz (বাংলায়!)
**১০টি MCQ** — Docker, Kubernetes, CI/CD, Linux, Git বিষয়ে

- ✅ **Instant Feedback** — সঠিক/ভুল সঙ্গে সঙ্গে দেখায়
- 💡 **বিস্তারিত ব্যাখ্যা** — প্রতিটি উত্তরের পর explanation
- 📊 **Score Tracking** — কতটুকু সঠিক হলো দেখা যায়
- 🔄 **Restart** — যতবার চাই quiz দেওয়া যায়

### 📝 Notes
- ✏️ **Markdown-style notes** লেখার editor
- 📁 **Multiple notes** — list view থেকে navigate করুন
- 💾 **Auto-save** — LocalStorage-এ persistent storage
- 🗑️ **Delete** — অপ্রয়োজনীয় note মুছুন

---

## 🛠️ Tech Stack

| Technology | কেন ব্যবহার হয়েছে |
|------------|-------------------|
| **HTML5** | Semantic structure, accessibility |
| **Vanilla CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | DOM manipulation, state management, LocalStorage |
| **Google Fonts** | Inter (UI) + JetBrains Mono (code) |
| **CSS Animations** | Flip cards, fade transitions, pulse effects |
| **LocalStorage API** | Progress & notes persistence |
| **Clipboard API** | One-click command copy |

> **No frameworks, no dependencies, no build tools** — শুধু browser দিয়েই চলে!

### Design System
- 🌑 **Dark Theme** — `#0a0e1a` primary background
- 🟢 **Accent Colors** — Green `#00ff88` · Cyan `#00d4ff` · Blue `#4f7dff`
- 🪟 **Glassmorphism** — backdrop-filter blur cards
- 📐 **CSS Grid + Flexbox** — responsive layout
- ✨ **Micro-animations** — hover effects, transitions, glow effects

---

## 🚀 Getting Started

### Prerequisites
শুধু একটি modern browser দরকার! (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# Repository clone করুন
git clone https://github.com/your-username/devops-navigator.git

# Directory-তে যান
cd devops-navigator

# index.html সরাসরি browser-এ খুলুন
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

### অথবা Live Server দিয়ে (Recommended)

VS Code-এ **Live Server extension** install করে `index.html`-এ right-click → *Open with Live Server*

---

## 📁 Project Structure

```
devops-navigator/
│
├── index.html          # Main HTML — সব sections এখানে
│
├── css/
│   └── style.css       # সম্পূর্ণ styling — variables, components, animations
│
├── js/
│   └── app.js          # Application logic — data, state, rendering
│
└── README.md           # এই ফাইল
```

### Architecture Overview

```
app.js
├── state {}            ← Global state (current section, progress, notes)
├── roadmapData []      ← ৬ phase × N topics
├── commandsData []     ← ১৬টি command objects
├── quizData []         ← ১০টি MCQ questions
├── conceptsData []     ← ৮টি concept cards
│
├── navigate()          ← Single-page navigation
├── renderRoadmap()     ← Dynamic roadmap generation
├── renderCommands()    ← Filtered command cards
├── renderConcepts()    ← Flip card generation
├── renderQuiz()        ← Quiz state machine
└── Notes CRUD          ← Create, read, update, delete notes
```

---

## 🎯 DevOps Learning Path

এই অ্যাপটি ব্যবহার করে নিচের roadmap follow করুন:

```
Week  1-4  →  🐧 Linux & Bash Scripting
Week  5-6  →  🌿 Git & GitHub
Week  7-9  →  🐳 Docker & Containerization
Week 10-12 →  🔄 CI/CD (GitHub Actions / Jenkins)
Week 13-16 →  ☁️ Cloud (AWS) & Terraform
Week 17-20 →  ☸️ Kubernetes & Monitoring
```

---

## 🤝 Contributing

Pull requests welcome! নতুন commands, quiz questions, বা concepts যোগ করতে চাইলে:

1. Fork করুন
2. Feature branch তৈরি করুন (`git checkout -b feature/add-new-commands`)
3. Changes commit করুন (`git commit -m 'feat: add terraform commands'`)
4. Push করুন (`git push origin feature/add-new-commands`)
5. Pull Request খুলুন

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Md. Aulad Hossen**
- GitHub: [@your-username](https://github.com/your-username)

---

<div align="center">

⭐ **যদি এই project কাজে লাগে, একটি Star দিন!** ⭐

Made with ❤️ for DevOps learners

</div>
