from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Todo, Category, TodoImage
from .serializer import TodoSerializer, CategorySerializer, TodoImageSerializer

# Create your views here.
class TodoImageView(viewsets.ModelViewSet):
    serializer_class = TodoImageSerializer
    queryset = TodoImage.objects.all()
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    
    #     queryset = TodoImage.objects.all()
    #     todo_id = self.kwargs.get('pk')
    #     print(f'\n{todo_id}\n')

    #     if todo_id:
    #         queryset = queryset.filter(id=todo_id)

    #     print(queryset)
    #     return queryset
    
class TodoImageListView(generics.ListAPIView):
    serializer_class = TodoImageSerializer
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        todo_id = self.kwargs['todo_id']
        print(todo_id)
        return TodoImage.objects.filter(todo=todo_id)

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


def Home(request):
    return render(request, "base.html")