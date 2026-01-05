## Task Manager System — Full-Stack (Django REST + React)

A **full-stack task management application** built with Django REST Framework and **React (TypeScript)**.  
It supports **cookie-based authentication**, role-based access, and follows a real-world software development workflow.

🔗 Live Demo: https://task-manager-system-1-7ceq.onrender.com/

**Demo login (no signup required)**
- Username: `testuser123`  
- Password: `testuser@12`
> Note: The app may take **up to ~50 seconds to start** on first load due to free-tier hosting cold starts.
---

### What this app does
- Users can authenticate and manage tasks
- Tasks support full **CRUD operations**
- **Role-based access control** (Admin / Standard user)
- Secure **cookie-based authentication** using JWT
- Backend APIs consumed by a typed React frontend

---

### Key highlights
- Django REST Framework backend with clean API design  
- React + TypeScript frontend with API integration  
- **JWT stored in HTTP-only cookies** for secure authentication  
- PostgreSQL database with migrations  
- Environment-based configuration using `.env`  
- **CI/CD pipeline with GitHub Actions**  
- Dockerized setup with Gunicorn for production  
- Agile-style development tracked using **Jira (Epics → Stories → Tasks)**  

---

### Tech stack
**Backend**
- Python, Django, Django REST Framework
- PostgreSQL
- SimpleJWT (cookie-based auth)

**Frontend**
- React
- TypeScript
- Axios

**DevOps & Tools**
- Docker
- GitHub Actions
- Jira
- Render (deployment)

---

Built to practice and demonstrate **real-world full-stack development**, from API design and authentication to deployment and iteration.
