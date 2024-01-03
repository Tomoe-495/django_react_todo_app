from rest_framework import serializers
from .models import Todo, Smth

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        # fields = ("id", 'title', 'description', 'completed')
        fields = "__all__"

class SmthSerializer(serializers.ModelSerializer):
    todo_name = serializers.ReadOnlyField(source="todo.title")
    todo_description = serializers.ReadOnlyField(source="todo.description")
    todo_completed = serializers.ReadOnlyField(source="todo.completed")

    class Meta:
        model = Smth
        fields = "__all__"
