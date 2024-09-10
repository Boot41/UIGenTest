import factory
from factory.django import DjangoModelFactory
from .models import Employer, JobListing

class EmployerFactory(DjangoModelFactory):
    class Meta:
        model = Employer
    name = factory.Faker('company')
    email = factory.Faker('email')

class JobListingFactory(DjangoModelFactory):
    class Meta:
        model = JobListing
    employer = factory.SubFactory(EmployerFactory)
    title = factory.Faker('job')
    description = factory.Faker('text')
    location = factory.Faker('city')
    is_active = True
