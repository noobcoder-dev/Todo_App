# Todo App

A full-stack Todo application built using **Django** and **React.js**. The app allows users to create, edit, and delete tasks, as well as organize them into completed and incomplete categories. Authentication is provided using **JWT** for secure access.

## Features

- User authentication (Register, Login, Logout)
- Add, edit, and delete tasks with title and description
- Mark tasks as completed or incomplete
- Filter tasks by their status (completed or incomplete)
- Responsive UI with **Reactstrap** and **Tailwind CSS** for styling
- JWT-based authentication for secure access

## Tech Stack

- **Frontend**: React.js, Reactstrap, Tailwind CSS
- **Backend**: Django, Django Rest Framework
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: SQLite (you can switch to PostgreSQL or MySQL in production)
- **Styling**: Tailwind CSS, Reactstrap

## Installation

### Backend (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver

   cd frontend
   npm install
   npm run dev
