import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CESI.settings')
django.setup()

from grades.models import Quarter, Grade
from datetime import date

# Create Q1 2024
q1, created = Quarter.objects.get_or_create(
    year=2024,
    quarter=1,
    defaults={
        'start_date': date(2024, 8, 1),
        'end_date': date(2024, 10, 31)
    }
)
print(f'Q1 2024: {q1}')

# Create Q2 2024
q2, created = Quarter.objects.get_or_create(
    year=2024,
    quarter=2,
    defaults={
        'start_date': date(2024, 11, 1),
        'end_date': date(2025, 1, 31)
    }
)
print(f'Q2 2024: {q2}')

# Create sample grades
grade1, created = Grade.objects.get_or_create(
    student_name='John Smith',
    subject='MATH',
    quarter=q1,
    defaults={'score': 92.50, 'comments': 'Excellent performance in algebra'}
)
print(f'Created: {grade1}')

grade2, created = Grade.objects.get_or_create(
    student_name='John Smith',
    subject='ENGLISH',
    quarter=q1,
    defaults={'score': 88.00, 'comments': 'Good essay writing skills'}
)
print(f'Created: {grade2}')

grade3, created = Grade.objects.get_or_create(
    student_name='Jane Doe',
    subject='SCIENCE',
    quarter=q1,
    defaults={'score': 95.75, 'comments': 'Outstanding lab work'}
)
print(f'Created: {grade3}')

print('\nAll grades created successfully!')
