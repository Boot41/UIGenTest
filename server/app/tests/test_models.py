from django.test import TestCase
from .models import Employer, JobListing

class EmployerModelTests(TestCase):
    def test_string_representation(self):
        employer = Employer(name='Test Employer')
        self.assertEqual(str(employer), employer.name)

class JobListingModelTests(TestCase):
    def test_string_representation(self):
        employer = Employer.objects.create(name='Test Employer', email='employer@example.com')
        job_listing = JobListing(employer=employer, title='Software Engineer')
        self.assertEqual(str(job_listing), job_listing.title)
