from django.contrib import admin
from .models import Todo, Category, TodoImage

class TodoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "completed")

# Register your models here.
admin.site.register(Todo)
admin.site.register(Category)
admin.site.register(TodoImage)
