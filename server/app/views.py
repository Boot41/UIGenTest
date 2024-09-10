from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import JobListing
from .serializers import JobListingSerializer

class JobListingViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = JobListingSerializer(data=request.data)
        if serializer.is_valid():
            job_listing = serializer.save(employer=request.user)
            return Response(JobListingSerializer(job_listing).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        filters = {}  # Initialize filters
        title = request.query_params.get('title', None)
        location = request.query_params.get('location', None)
        job_type = request.query_params.get('type', None)
        posted_date = request.query_params.get('posted_date', None)

        if title:
            filters['title__icontains'] = title
        if location:
            filters['location__icontains'] = location
        if job_type:
            filters['job_type'] = job_type
        if posted_date:
            filters['posted_date'] = posted_date

        job_listings = JobListing.objects.filter(is_active=True, **filters)
        serializer = JobListingSerializer(job_listings, many=True)
        return Response(serializer.data)

    def retrieve(self, request, job_id):
        job_listing = get_object_or_404(JobListing, id=job_id)
        serializer = JobListingSerializer(job_listing)
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