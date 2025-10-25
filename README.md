
```md
# 🌐 Next-Level Portfolio — Frontend

A modern, dynamic, and interactive portfolio website built with **Next.js**, **TypeScript**, and **TailwindCSS**.  
This project reflects my journey as a **Full-Stack Developer**, featuring smooth animations, responsive design, and secure authentication for admin-only actions.

---

## 🚀 Features

### 🎨 User Interface
- **Modern UI/UX** with smooth animations using **Framer Motion**.
- **Dark/Light/System Theme Toggle** using `next-themes` (auto-detects system mode).
- Fully **responsive design** for all screen sizes.
- Elegant **navbar with section routing** (`Home`, `About`, `Skills`, `Projects`, `Blogs`, `Services`, `Dashboard`, `Login`).
- **Chevron navigation system** for smooth scrolling between sections.
- **Download CV** button — allows visitors to instantly download the owner’s CV.
- **Globe animation** displaying location markers of six countries, rotating infinitely in 360°.
- **Footer with Quick Links** for fast navigation.

---

## 🔐 Authentication & Authorization
- Integrated with **Next-Auth**.
- **Owner-only login system** — only the site owner can:
  - Access the **Dashboard**
  - Create, Update, and Delete **projects**
  - Create, Update, and Delete **blogs**
- Visitors can **read blogs and view projects** but cannot modify them.
- **Google login** available for the owner.
- **GitHub login button** integrated but currently disabled (for future use).
- **Logout button** in Dashboard to end the session securely.

---

## 🧭 Dashboard Features (Admin Only)
> Accessible only after login (for the site owner).

### 🧩 Blog Management
- Admin can **create new blogs** directly from the Dashboard.
- Each blog card has a **3-dot menu icon** (...) at the top-right corner.
- Clicking the menu opens two options:
  - **📝 Update** — Opens a modal with a pre-filled form where the admin can edit the title, content, or image.  
    Upon submission, the data updates instantly and the **UI reflects the new changes**.
  - **🗑️ Delete** — Opens a confirmation modal.  
    After confirming, the blog is permanently deleted and removed from the UI in real-time.

### 🧱 Project Management
- Admin can **create new projects** from the Dashboard (title, description, image, GitHub link, live link).
- All created projects are automatically displayed in the **Projects** section.
- Future update/delete options will also follow the same modal-based system as blogs.

### 🚪 Logout System
- The Dashboard includes a dedicated **Logout button**.
- Clicking it will:
  - **Sign out** the current user session.
  - Automatically **redirect** to the `/login` route.
  - Securely clear authentication tokens from session.

---

## 🧭 Navigation Flow
| Action | Result |
|--------|---------|
| Click on bottom chevron | Scroll to **About** section |
| Click on “Explore My Work” | Scroll to **Projects** section |
| Click on top-right chevron | Scroll back to **Home** |
| Theme toggle | Instantly switch between Dark/Light/System modes |
| Click on “Dashboard” (after login) | Redirect to **Admin Dashboard** |
| Click on “Logout” in Dashboard | End session & redirect to **Login** |

---

## 🧩 Tech Stack
### ⚛️ Frontend Technologies
- **Next.js (TypeScript)**
- **Tailwind CSS**
- **Framer Motion**
- **Shadcn/UI**
- **Lucide React Icons**
- **Next-Themes**
- **Next-Auth**
- **React Hook Form**
- **Zod Validation**
- **Axios**
- **React Toast Notifications**

---

## 📁 Folder Structure
```

frontend/
├── components/
│   ├── shared/
│   ├── ui/
│   ├── home/
│   ├── skills/
│   ├── projects/
│   ├── blogs/
│   └── dashboard/
├── pages/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   └── index.tsx
├── styles/
├── public/
├── hooks/
└── utils/

````

---

## ⚙️ Setup & Run
```bash
# Clone the repository
git clone https://github.com/tipusahil/next-level-portfolio.git

# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
````

Then open:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌗 Environment Variables

```
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

---

## 🧠 Highlights

* Built with **Performance & Aesthetics** in mind.
* Seamless user experience with **dynamic routing & smooth transitions**.
* Strong focus on **access control** and **security**.
* Professional-grade **theme system**.
* Scalable & easily extendable structure.
* Modal-based **CRUD operations** for blogs and projects.
* Smooth, real-time **UI updates** after create/update/delete actions.
* Fully protected **Admin Dashboard** ensuring safe access control.

---

## 🧑‍💻 Author

**Tipu Sahil**
📧 Email: [tipusahil.ctg@gmail.com](mailto:tipusahil.ctg@gmail.com)
🔗 [Portfolio](https://tipusahil.vercel.app)
🐙 [GitHub](https://github.com/tipusahil)
💼 [LinkedIn](https://www.linkedin.com/in/tipusahil)
💬 [X (Twitter)](https://x.com/tipusahil_X)
📘 [Facebook](https://www.facebook.com/tipusahilx)

```


