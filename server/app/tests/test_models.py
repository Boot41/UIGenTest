from django.test import TestCase
from .models import Employer, JobListing, JobApplication

class EmployerModelTests(TestCase):
    def test_string_representation(self):
        employer = Employer(name='Test Employer')
        self.assertEqual(str(employer), employer.name)

class JobListingModelTests(TestCase):
    def test_string_representation(self):
        employer = Employer.objects.create(name='Test Employer', email='employer@example.com')
        job_listing = JobListing(employer=employer, title='Software Engineer')
        self.assertEqual(str(job_listing), job_listing.title)

class JobApplicationModelTests(TestCase):
    def test_string_representation(self):
        employer = Employer.objects.create(name='Test Employer', email='employer@example.com')
        job_listing = JobListing.objects.create(employer=employer, title='Software Engineer', description='Develop software', location='Remote', job_type='Full-time')
        job_application = JobApplication(job_listing=job_listing, seeker_id=1, resume='Test Resume')
        self.assertEqual(str(job_application.job_listing), job_listing.title)
