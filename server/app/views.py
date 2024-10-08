from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import JobListing, JobApplication
from .serializers import JobListingSerializer, JobApplicationSerializer

class JobListingViewSet(viewsets.ViewSet):
    # Existing methods (create, list, retrieve, update, destroy) remain unchanged

class JobApplicationViewSet(viewsets.ViewSet):
    def create(self, request, job_id):
        job_listing = get_object_or_404(JobListing, id=job_id)
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            application = serializer.save(job_listing=job_listing, seeker_id=request.user.id)
            return Response(JobApplicationSerializer(application).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, seeker_id):
        applications = JobApplication.objects.filter(seeker_id=seeker_id)
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def update(self, request, application_id):
        application = get_object_or_404(JobApplication, id=application_id, seeker_id=request.user.id)
        serializer = JobApplicationSerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            updated_application = serializer.save()
            return Response(JobApplicationSerializer(updated_application).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, application_id):
        application = get_object_or_404(JobApplication, id=application_id, seeker_id=request.user.id)
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
