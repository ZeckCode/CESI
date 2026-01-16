from django.urls import path
from .views import TransactionList

urlpatterns = [
    path('transactions/', TransactionList.as_view(), name='transaction-list'),
]
