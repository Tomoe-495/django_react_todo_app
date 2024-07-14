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
    
    def save(self, *args, **kwargs):
        try:
            this = Todo.objects.get(id=self.id)
            storage, path = this.image.storage, this.image.path
            storage.delete(path)
        except:
            pass

        super(Todo, self).save(*args, **kwargs)