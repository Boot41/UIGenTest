from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Employer, JobListing

class JobListingTests(APITestCase):
    def setUp(self):
        self.employer = Employer.objects.create(name='Employer 1', email='employer1@example.com')
        self.url = reverse('joblisting-list', kwargs={'employer_id': self.employer.id})

    def test_create_job_listing(self):
        data = {
            'title': 'Software Engineer',
            'description': 'Develop and maintain software applications.',
            'location': 'Remote',
            'is_active': True
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JobListing.objects.count(), 1)

    def test_list_job_listings(self):
        JobListing.objects.create(employer=self.employer, title='Tester', description='Test applications.', location='Onsite', is_active=True)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
