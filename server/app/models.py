from django.db import models

class Employer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class JobListing(models.Model):
    employer = models.ForeignKey(Employer, related_name='jobs', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=100)
    posted_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    job_listing = models.ForeignKey(JobListing, related_name='applications', on_delete=models.CASCADE)
    seeker_id = models.IntegerField()  # Assuming seeker_id is an integer, can be modified to a ForeignKey if needed
    resume = models.TextField()  # Assuming resumes are stored as text (could be modified to a FileField)
    applied_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')  # status can be 'Pending', 'Accepted', 'Rejected'

class ApplicationStatus(models.TextChoices):
    PENDING = 'Pending', 'Pending'
    ACCEPTED = 'Accepted', 'Accepted'
    REJECTED = 'Rejected', 'Rejected'
