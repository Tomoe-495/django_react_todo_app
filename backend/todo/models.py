from django.db import models
import os

# Create your models here.
class Category(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    image = models.ImageField(upload_to="post_images", null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="todos")

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super(Todo, self).delete(*args, **kwargs)