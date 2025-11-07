FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# System deps for mysqlclient build
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/

RUN pip install --upgrade pip && pip install -r requirements.txt && pip install gunicorn

COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "task_manager.wsgi:application", "--bind", "0.0.0.0:8000"]
    