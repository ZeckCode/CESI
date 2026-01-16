from django.db import models
class Transaction(models.Model):
    TYPE_CHOICES = [
        ('TUITION', 'Tuition Fee'),
        ('MISC', 'Miscellaneous'),
        ]
    STATUS_CHOICES = [
        ('PAID', 'Paid'),
        ('PENDING', 'Pending'),
        ('OVERDUE', 'Overdue'),
        ]
    student_name = models.CharField(max_length=150)
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True) # Optional details
    date_created = models.DateTimeField(auto_now_add=True) # Auto-timestamp
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    
    def __str__(self):
        return f"{self.student_name} - {self.transaction_type} ({self.id})"



