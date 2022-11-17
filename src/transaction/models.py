from django.db import models
from django.utils import timezone

# Create your models here.


class Transactions(models.Model):
    STATUS_CHOICE = [
        (None, 'None'),
        ('initiated', 'ACH Initiated'),
        ('returned', 'ACH Returned'),
        ('authorized', 'ACH Authorized'),
        ('successful', 'Successful'),
        ('cancelled', 'Cancelled'),
    ]

    SOURCE_CHOICE = [
        (None, 'None'),
        ('payments', 'Payments'),
        ('ecommerce', 'E-commerce'),
        ('instore', 'In-Store'),
    ]


    date = models.DateTimeField(default=timezone.now)

    gross_amount = models.FloatField(default=0.0)
    status = models.CharField(choices=STATUS_CHOICE,
                              default=None, null=True, blank=True, max_length=15)
    customer = models.CharField(max_length=255, default="")
    swifter_id = models.CharField(max_length=6, default="")
    external_id = models.CharField(max_length=6, default="")
    source = models.CharField(choices=SOURCE_CHOICE,
                              default=None, null=True, blank=True, max_length=15)

    class Meta:
        db_table = "transactions"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return f"{str(self.customer)} | {str(self.swifter_id)}"
