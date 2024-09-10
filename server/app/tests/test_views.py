from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .factories import JobListingFactory, EmployerFactory

class JobListingViewSetTests(APITestCase):
    def setUp(self):
        self.employer = EmployerFactory()
        self.client.force_authenticate(user=self.employer)

    def test_create_job_listing(self):
        response = self.client.post(reverse('joblisting-list'), {
            'title': 'Software Engineer',
            'description': 'Job description',
            'location': 'New York',
            'is_active': True
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_job_listings(self):
        JobListingFactory(employer=self.employer)
        response = self.client.get(reverse('joblisting-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_job_listings_with_filters(self):
        JobListingFactory(employer=self.employer, title='Software Engineer')
        JobListingFactory(employer=self.employer, title='Data Analyst')
        response = self.client.get(reverse('joblisting-list'), {'title': 'Software'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_job_listing(self):
        job_listing = JobListingFactory(employer=self.employer)
        response = self.client.put(reverse('joblisting-detail', args=(job_listing.id,)), {
            'title': 'Senior Software Engineer',
            'description': 'Updated description',
            'location': 'San Francisco',
            'is_active': True
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Senior Software Engineer')

    def test_delete_job_listing(self):
        job_listing = JobListingFactory(employer=self.employer)
        response = self.client.delete(reverse('joblisting-detail', args=(job_listing.id,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(JobListing.objects.filter(id=job_listing.id).exists())
