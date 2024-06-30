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
    image = models.ImageField(upload_to="images", null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="todos")

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        if self.image:
            storage, path = self.image.storage, self.image.path
            super(Todo, self).delete(*args, **kwargs)
            storage.delete(path)
        else:
            super(Todo, self).delete(*args, **kwargs)
    
    def update(self, *args, **kwargs):
        current_instance = Todo.objects.get(pk=self.pk)

        print(current_instance.image, self.image)
        print(current_instance.image == self.image)
        # if self.image != current_instance.image:
        #     storage, path = self.image.storage, self.image.path
        #     storage.delete(path)
        super().update(*args, **kwargs)