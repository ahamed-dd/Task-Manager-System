 ## Task Manager System (Django REST)

A RESTful API built with Django REST Framework and React for managing users, tasks, and authentication.
This project simulates a real-world software company workflow — including Agile sprints, CI/CD, automated testing, and deployment.

[Live Demo](https://task-manager-system-1-7ceq.onrender.com/ "Optional tooltip")

Table of Contents
General Info
Technologies
Installation
Usage
Collaboration
General Info

# Key Features:

- JWT-based authentication and authorization

- Responsive React Frontend

- User and Task management (CRUD operations)

- Role-based access (Admin / Standard user)

- PostgreSQL database with migrations

- Environment-based configuration using .env

- Unit testing and CI/CD with GitHub Actions

- Docker-based deployment

- Jira-based sprint tracking (Epics → Stories → Tasks)

# Technologies

- Python: 3.10+
- React (TypeScript)
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
# 1. Clone the repository
git clone https://github.com/<your-username>/task-manager-django.git
cd task-manager-django

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env

# Example .env content
DJANGO_SECRET_KEY= xxxxxxxxxxxxxxxx
DJANGO_DEBUG=True

DB_NAME=manager_db
DB_USER=root
DB_PASSWORD=xxxxxxx
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 5. Run migrations
python manage.py migrate

# 6. Create superuser
python manage.py createsuperuser

# 7. Start the development server
python manage.py runserver

# 8. Run React Frontend
npm run dev

# Deployment
I have used Render for deployment, as it support integration with postgreSQL and Static Site support. You can deploy anywhere in your choice.
If you are deploying in sever(AWS, of Azure), make use of Docker and Nginx files which are fully configured. Clone the repository, run the Docker-compose.

