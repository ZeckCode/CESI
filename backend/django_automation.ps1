# Django Backend Automation Script
# This PowerShell script automates common Django tasks for the backend folder.
# Usage: Run in PowerShell from the backend directory or provide the full path to the backend directory.

$backendPath = "C:/Users/John Restauro/Downloads/CESI-main/CESI-main/backend"
$pythonExe = "C:/Users/John Restauro/Downloads/CESI-main/.venv/Scripts/python.exe"

Write-Host "Running Django migrations..."
& $pythonExe manage.py migrate

Write-Host "Collecting static files..."
& $pythonExe manage.py collectstatic --noinput

Write-Host "(Optional) Creating superuser..."
Write-Host "To create a superuser, run:"
Write-Host "    & $pythonExe manage.py createsuperuser"

Write-Host "Django backend automation complete."
