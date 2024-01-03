from django.shortcuts import render
from .serializer import TodoSerializer, SmthSerializer
from .models import Todo, Smth
from rest_framework import viewsets

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class SmthView(viewsets.ModelViewSet):
    serializer_class = SmthSerializer
    queryset = Smth.objects.all()
    