from rest_framework.test import APITestCase
from rest_framework import status
from .models import JobListing, JobApplication
from django.urls import reverse

class JobApplicationTests(APITestCase):
    def setUp(self):
        self.employer = Employer.objects.create(name='Test Employer', email='employer@example.com')
        self.job_listing = JobListing.objects.create(employer=self.employer, title='Test Job', description='Job Description', location='Remote', job_type='Full-time')
        self.seeker_id = 1  # Assuming seeker_id to be an integer

    def test_apply_for_job_success(self):
        url = reverse('jobapplication-list', kwargs={'job_id': self.job_listing.id})
        data = {'resume': 'Sample Resume'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_apply_for_job_invalid_data(self):
        url = reverse('jobapplication-list', kwargs={'job_id': self.job_listing.id})
        data = {}  # Empty data to trigger validation error
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_applications_success(self):
        # Create a job application first
        url = reverse('jobapplication-list', kwargs={'seeker_id': self.seeker_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_applications_no_applications(self):
        url = reverse('jobapplication-list', kwargs={'seeker_id': 2})  # Assuming seeker_id 2 has no applications
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
