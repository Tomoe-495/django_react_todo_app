# Generated by Django 4.2.4 on 2024-01-03 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Smth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('todo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todos', to='todo.todo')),
            ],
        ),
    ]
