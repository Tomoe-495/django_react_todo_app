from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo, Category
from .serializer import TodoSerializer, CategorySerializer

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


def Home(request):
    return render(request, "base.html")