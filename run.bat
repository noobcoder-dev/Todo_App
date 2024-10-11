@echo off
call env\Scripts\activate
cd todo_project
start cmd /k "python manage.py runserver"
cd ..\todo-frontend
start cmd /k "npm run dev"
