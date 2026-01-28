from django.db import models


class Quarter(models.Model):
    """Represents a quarter in the academic year (Q1, Q2, Q3, Q4)"""
    QUARTER_CHOICES = [
        (1, 'Q1 (Aug-Oct)'),
        (2, 'Q2 (Nov-Jan)'),
        (3, 'Q3 (Feb-Apr)'),
        (4, 'Q4 (May-Jul)'),
    ]
    year = models.IntegerField(help_text="Academic year (e.g., 2024)")
    quarter = models.IntegerField(choices=QUARTER_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = ['-year', 'quarter']
        unique_together = ('year', 'quarter')

    def __str__(self):
        return f"Q{self.quarter} {self.year}"


class Grade(models.Model):
    """Student grades per subject per quarter"""
    SUBJECT_CHOICES = [
        ('MATH', 'Mathematics'),
        ('ENGLISH', 'English'),
        ('SCIENCE', 'Science'),
        ('SOCIAL_STUDIES', 'Social Studies'),
        ('PE', 'Physical Education'),
        ('ART', 'Art'),
        ('MUSIC', 'Music'),
    ]

    student_name = models.CharField(max_length=200)  # Will replace with FK to Student when accounts ready
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    quarter = models.ForeignKey(Quarter, on_delete=models.CASCADE, related_name='grades')
    score = models.DecimalField(max_digits=5, decimal_places=2, help_text="Grade score (0-100)")
    comments = models.TextField(blank=True, null=True, help_text="Teacher comments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-quarter', 'student_name', 'subject']
        unique_together = ('student_name', 'subject', 'quarter')

    def __str__(self):
        return f"{self.student_name} - {self.subject} ({self.quarter}): {self.score}"
