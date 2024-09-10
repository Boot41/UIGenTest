from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Employer, JobListing

class JobListingViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.employer = Employer.objects.create(name='Test Employer', email='test@employer.com')
        self.client.force_login(self.employer)
        self.job_listing = JobListing.objects.create(
            employer=self.employer,
            title='Test Job',
            description='Job Description',
            location='Remote',
            job_type='Full-time'
        )

    def test_create_job_listing(self):
        response = self.client.post('/api/jobs/', {
            'title': 'New Job',
            'description': 'New Job Description',
            'location': 'On-site',
            'job_type': 'Part-time'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_job_listings(self):
        response = self.client.get('/api/jobs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_job_listing(self):
        response = self.client.get(f'/api/jobs/{self.job_listing.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.job_listing.title)

    def test_update_job_listing(self):
        response = self.client.put(f'/api/jobs/{self.job_listing.id}/', {
            'title': 'Updated Job',
            'description': 'Updated Description',
            'location': 'Updated Location',
            'job_type': 'Updated Type'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.job_listing.refresh_from_db()
        self.assertEqual(self.job_listing.title, 'Updated Job')

    def test_delete_job_listing(self):
        response = self.client.delete(f'/api/jobs/{self.job_listing.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.job_listing.refresh_from_db()
        self.assertFalse(self.job_listing.is_active)

    def test_retrieve_nonexistent_job_listing(self):
        response = self.client.get('/api/jobs/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
