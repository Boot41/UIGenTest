from django.test import TestCase
from .models import Employer, JobListing

class JobListingModelTests(TestCase):
    def setUp(self):
        self.employer = Employer.objects.create(name='Employer 1', email='employer1@example.com')

    def test_job_listing_creation(self):
        job_listing = JobListing.objects.create(employer=self.employer, title='Engineer', description='Test', location='Remote', is_active=True)
        self.assertEqual(job_listing.title, 'Engineer')
        self.assertEqual(job_listing.employer, self.employer)
