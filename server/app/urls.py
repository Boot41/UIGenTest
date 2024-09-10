from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobListingViewSet, JobApplicationViewSet

router = DefaultRouter()
router.register(r'jobs', JobListingViewSet, basename='joblisting')
router.register(r'job-applications', JobApplicationViewSet, basename='jobapplication')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/applications/<int:application_id>/schedule-interview/', JobApplicationViewSet.as_view({'post': 'schedule_interview'}), name='schedule-interview'),
]
