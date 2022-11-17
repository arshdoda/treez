from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView, UpdateAPIView
from .pagination import SmallResultsSetPagination
from .models import Transactions
from .serializers import TransactionSerializer
from rest_framework.response import Response
import random
import pandas as pd
from django.conf import settings
from django.http import FileResponse
from django.views.generic import TemplateView

# Create your views here.


class LandingView(TemplateView):
    template_name = 'transaction/base.html'
    title = 'Treez'



class TransactionListAPIView(ListAPIView):
    serializer_class = None
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        search = self.request.GET.get("search", None)
        filter = self.request.GET.get("filter", None)
        if search:
            return Transactions.objects.filter(customer__icontains=search)
        elif filter:
            return Transactions.objects.filter(status=filter)
        return Transactions.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.paginate_queryset(self.get_queryset())
        serializer = TransactionSerializer(queryset, many=True)
        if serializer.data:
            return self.get_paginated_response(serializer.data)
        return Response({"msg": "No data found",
                         "data": []}, status=200)


class UploadDataAPIView(GenericAPIView):
  
    def get(self, request, *args, **kwargs):
        post_obj = []
        status_list = ['initiated','returned','authorized','successful','cancelled']
        source_list = ['payments','ecommerce','instore']
        for i in range(1,16):
            amount = round(random.uniform(0.00,100.00),2)
            a = Transactions(gross_amount=amount, status=random.choice(status_list),
                customer=f"Name {i}",swifter_id="4796WM",external_id="EOO2AO", source=random.choice(source_list))
            post_obj.append(a)
        if post_obj:
            Transactions.objects.bulk_create(post_obj, batch_size=1000)

        return Response({"msg": "Dummy data uploaded"}, status=200)


class DownloadDataAPIView(GenericAPIView):
  
    def get(self, request, *args, **kwargs):
        d = Transactions.objects.all().values("date","gross_amount","status","customer","swifter_id","external_id","source")
        path = settings.MEDIA_ROOT +"/sample.csv"
        df = pd.DataFrame.from_dict(d)
        df.to_csv(path,index=False)
        file = open(path, 'rb')
        return FileResponse(file)

