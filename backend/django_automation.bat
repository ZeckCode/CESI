@echo off
REM Django Backend Automation Batch Script
REM Run this file from the backend directory (double-click or run in cmd)

SETLOCAL
SET BACKEND_PATH=%~dp0
SET VENV_PATH=%BACKEND_PATH%..\.venv
SET PYTHON_EXE=%VENV_PATH%\Scripts\python.exe

IF NOT EXIST "%PYTHON_EXE%" (
    echo Python virtual environment not found at %PYTHON_EXE%.
    echo Please set up the virtual environment first.
    pause
    exit /b 1
)

cd /d "%BACKEND_PATH%"

REM Run migrations
echo Running Django migrations...
"%PYTHON_EXE%" manage.py migrate

REM Collect static files
echo Collecting static files...
"%PYTHON_EXE%" manage.py collectstatic --noinput

REM Reminder for superuser
echo.
echo (Optional) To create a Django superuser, run:
echo     "%PYTHON_EXE%" manage.py createsuperuser

echo.
echo Django backend automation complete.
pause
ENDLOCAL
