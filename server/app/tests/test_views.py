from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import JobListing, JobApplication

class JobApplicationTests(APITestCase):
    def setUp(self):
        self.job_listing = JobListing.objects.create(
            employer_id=1,
            title='Software Engineer',
            description='Develop applications',
            location='Remote',
            job_type='Full-time',
            is_active=True
        )
        self.application = JobApplication.objects.create(
            job_listing=self.job_listing,
            seeker_id=1,
            resume='My resume content'
        )
        self.valid_data = {'resume': 'Updated resume content'}
        self.invalid_data = {'resume': ''}

    def test_update_job_application(self):
        url = reverse('jobapplication-detail', args=[self.application.id])
        response = self.client.put(url, self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resume'], 'Updated resume content')

    def test_update_job_application_invalid_data(self):
        url = reverse('jobapplication-detail', args=[self.application.id])
        response = self.client.put(url, self.invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_withdraw_job_application(self):
        url = reverse('jobapplication-detail', args=[self.application.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_withdraw_non_existent_application(self):
        url = reverse('jobapplication-detail', args=[999])  # Non-existent ID
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
