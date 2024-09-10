from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import JobListing, Employer
from .serializers import JobListingSerializer

class JobListingViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = JobListingSerializer(data=request.data)
        if serializer.is_valid():
            job_listing = serializer.save(employer=request.user)
            return Response(JobListingSerializer(job_listing).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, employer_id):
        employer = get_object_or_404(Employer, id=employer_id)
        job_listings = employer.jobs.filter(is_active=True)
        serializer = JobListingSerializer(job_listings, many=True)
        return Response(serializer.data)

    def update(self, request, job_id):
        job_listing = get_object_or_404(JobListing, id=job_id, employer=request.user)
        serializer = JobListingSerializer(job_listing, data=request.data)
        if serializer.is_valid():
            job_listing = serializer.save()
            return Response(JobListingSerializer(job_listing).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, job_id):
        job_listing = get_object_or_404(JobListing, id=job_id, employer=request.user)
        job_listing.is_active = False
        job_listing.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
