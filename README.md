 ## Task Manager System (Django REST)

A RESTful API built with Django REST Framework for managing users, tasks, and authentication.
This project simulates a real-world software company workflow — including Agile sprints, CI/CD, automated testing, and deployment.

Table of Contents
General Info
Technologies
Installation
Usage
Collaboration
General Info

Status: In Development (Sprint 0 → Sprint 4)
Purpose: Implement the full Software Development Life Cycle (SDLC) — from design to deployment — using Django REST Framework and modern DevOps tools.

# Key Features:

- JWT-based authentication and authorization

- User and Task management (CRUD operations)

- Role-based access (Admin / Standard user)

- PostgreSQL database with migrations

- Environment-based configuration using .env

- Unit testing and CI/CD with GitHub Actions

- Docker-based deployment

- Jira-based sprint tracking (Epics → Stories → Tasks)

# Technologies

- Python: 3.10+
- Django: 5.x
- Django REST Framework (DRF): 3.x
- MySQL: Relational database
- djangorestframework-simplejwt: JWT authentication
- django-environ: Environment variable management
- pytest-django: Testing framework
- Gunicorn: Production WSGI server
- Docker: Containerization
- GitHub Actions: CI/CD automation
- Jira: Agile sprint planning

## Installation
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/task-manager-django.git
cd task-manager-django

# 2️⃣ Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 3️⃣ Install dependencies
pip install -r requirements.txt

# 4️⃣ Set up environment variables
cp .env.example .env

# Example .env content
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/taskmanager
ALLOWED_HOSTS=127.0.0.1,localhost

# 5️⃣ Run migrations
python manage.py migrate

# 6️⃣ Create superuser
python manage.py createsuperuser

# 7️⃣ Start the development server
python manage.py runserver

Usage

Once the server is running:

Visit http://127.0.0.1:8000/api/ → Main API endpoint

Visit http://127.0.0.1:8000/admin/ → Django Admin dashboard

API documentation (if enabled): http://127.0.0.1:8000/swagger/ or /redoc/

Example Endpoints
Method	Endpoint	Description
POST	/api/auth/register/	Register new user
POST	/api/auth/login/	Obtain JWT access token
GET	/api/tasks/	List all tasks for logged-in user
POST	/api/tasks/	Create a new task
PUT	/api/tasks/{id}/	Update a task
DELETE	/api/tasks/{id}/	Delete a task
Example Request
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
-H "Content-Type: application/json" \
-d '{"username": "ahamed", "password": "strongpass123"}'

Example Response
{
  "id": 1,
  "username": "ahamed",
  "email": "ahamed@example.com",
  "token": "eyJ0eXAiOiJKV1QiLCJh..."
}

# Collaboration
🧩 Contributing

Fork the repository

Create your feature branch:
git checkout -b feature/new-feature

Commit your changes:
git commit -m "Add new feature"

Push to your branch:
git push origin feature/new-feature

Open a pull request

# Code of Conduct

Be respectful, follow PEP8 guidelines, and write meaningful commit messages.
Ensure all tests pass before merging to the main branch.

# Reporting Issues

Use GitHub Issues or simulate a Jira ticket for bugs and feature requests.

Example requirements.txt
Django>=5.0
djangorestframework
djangorestframework-simplejwt
django-environ
psycopg2-binary
pytest
pytest-django
black
flake8
isort
gunicorn
