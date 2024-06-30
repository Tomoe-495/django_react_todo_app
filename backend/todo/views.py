from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo, Category
from .serializer import TodoSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.
class TodoView(APIView):
    # serializer_class = TodoSerializer
    # queryset = Todo.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        todo_serializer = TodoSerializer(data=request.data)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return Response(todo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', todo_serializer.errors)
            return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryView(APIView):
    # serializer_class = CategorySerializer
    # queryset = Category.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        Categories = Category.objects.all()
        serializer = CategorySerializer(Categories, many=True)
        return Response(serializer.data)


def Home(request):
    return render(request, "base.html")