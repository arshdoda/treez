from .models import Transactions
from django.conf import settings
from rest_framework.serializers import DateTimeField, ModelSerializer


class TransactionSerializer(ModelSerializer):
    date = DateTimeField(format=settings.DATE_TIME_FORMAT)

    class Meta:
        model = Transactions
        fields= '__all__'    
