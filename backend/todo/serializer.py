from rest_framework import serializers
from .models import Todo, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"

    # def create(self, validated_data):
    #     category_data = validated_data.pop('category')
    #     category, created = Category.objects.get_or_create(**category_data)
    #     todo = Todo.objects.create(category=category, **validated_data)
    #     return todo
    
    # def update(self, instance, validated_data):
    #     category_data = validated_data.pop('category')
    #     category , created = Category.objects.get_or_create(**category_data)
    #     instance.category = category
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.image = validated_data.get("image", instance.image)
    #     instance.completed = validated_data.get('completed', instance.completed)
    #     instance.save()
    #     return instance
