from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="todos")

    def __str__(self):
        return self.title
