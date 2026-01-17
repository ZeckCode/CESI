from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer

from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionList(generics.ListCreateAPIView):
	queryset = Transaction.objects.all()
	serializer_class = TransactionSerializer
