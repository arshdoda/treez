from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'prev': self.get_previous_link(),
            'count': self.page.paginator.count,
            'page_no': self.get_page_number(self.request, self.page.paginator),
            'data': data,
            'pages': math.ceil(self.page.paginator.count/self.page_size),
        })
