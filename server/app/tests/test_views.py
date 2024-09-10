import json
from rest_framework import status
from rest_framework.test import APITestCase
from .models import JobListing, JobApplication

class JobApplicationTests(APITestCase):
    def setUp(self):
        self.job_listing = JobListing.objects.create(title='Test Job', description='Test Description', location='Test Location', job_type='Full-time', employer_id=1)
        self.application_data = {
            'resume': 'Test Resume'
        }

    def test_create_application(self):
        response = self.client.post(f'/api/jobs/{self.job_listing.id}/applications/', self.application_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_applications(self):
        self.client.post(f'/api/jobs/{self.job_listing.id}/applications/', self.application_data)
        response = self.client.get(f'/api/jobs/{self.job_listing.id}/applications/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_update_application_status(self):
        application = JobApplication.objects.create(job_listing=self.job_listing, seeker_id=1, resume='Test Resume')
        response = self.client.put(f'/api/applications/{application.id}/status/', {'status': 'Accepted'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        application.refresh_from_db()
        self.assertEqual(application.status, 'Accepted')

    def test_update_nonexistent_application(self):
        response = self.client.put('/api/applications/999/status/', {'status': 'Accepted'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_bad_request_update_application(self):
        application = JobApplication.objects.create(job_listing=self.job_listing, seeker_id=1, resume='Test Resume')
        response = self.client.put(f'/api/applications/{application.id}/status/', {'status': 'InvalidStatus'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_schedule_interview(self):
        application = JobApplication.objects.create(job_listing=self.job_listing, seeker_id=1, resume='Test Resume')
        response = self.client.post(f'/api/applications/{application.id}/schedule-interview/', {'interview_time': '2023-10-01T10:00:00Z'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        application.refresh_from_db()
        self.assertEqual(application.status, 'Scheduled for Interview')

    def test_schedule_interview_missing_time(self):
        application = JobApplication.objects.create(job_listing=self.job_listing, seeker_id=1, resume='Test Resume')
        response = self.client.post(f'/api/applications/{application.id}/schedule-interview/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Interview time is required.')
