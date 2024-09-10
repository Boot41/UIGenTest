from rest_framework import status
from rest_framework.test import APITestCase
from .models import Employer, JobListing

class JobListingViewSetTests(APITestCase):

    def setUp(self):
        self.employer = Employer.objects.create(name='Test Employer', email='employer@example.com')
        self.client.force_authenticate(user=self.employer)

    def test_create_job_listing(self):
        response = self.client.post('/api/employers/{}/jobs/'.format(self.employer.id), {
            'title': 'Software Engineer',
            'description': 'Develops software',
            'location': 'Remote',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_job_listing(self):
        JobListing.objects.create(employer=self.employer, title='Software Engineer', description='Develops software', location='Remote')
        response = self.client.get('/api/employers/{}/jobs/'.format(self.employer.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_job_listing(self):
        job_listing = JobListing.objects.create(employer=self.employer, title='Software Engineer', description='Develops software', location='Remote')
        response = self.client.put('/api/jobs/{}/'.format(job_listing.id), {
            'title': 'Senior Software Engineer',
            'description': 'Develops software and leads teams',
            'location': 'Remote',
            'is_active': True
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        job_listing.refresh_from_db()
        self.assertEqual(job_listing.title, 'Senior Software Engineer')

    def test_delete_job_listing(self):
        job_listing = JobListing.objects.create(employer=self.employer, title='Software Engineer', description='Develops software', location='Remote')
        response = self.client.delete('/api/jobs/{}/'.format(job_listing.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        job_listing.refresh_from_db()
        self.assertFalse(job_listing.is_active)
