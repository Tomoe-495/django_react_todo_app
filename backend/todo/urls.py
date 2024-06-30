from django.urls import path
from . import views

urlpatterns = [
    path("todos/", views.TodoView.as_view(), name="todo_list"),
    path("category/", views.CategoryView.as_view(), name="category_list")
]
