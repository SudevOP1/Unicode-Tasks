from django.shortcuts import render, redirect
from home.models import *
from home.forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required



@login_required(login_url="login")
def index(request):
    # user_tasks = Task.objects.all()
    user_tasks = request.user.task.all()
    return render(request, "index.html", {"user_tasks":user_tasks})

@login_required(login_url="login")
def add(request):
    try:
        if request.method == "POST":
            task = Task(
                username     = request.user,
                name         = request.POST.get("name"),
                desc         = request.POST.get("desc"),
                priority     = request.POST.get("priority"),
                due_date     = request.POST.get("due_date"),
                image        = request.FILES.get("image"),
                is_completed = False,
            )
            task.save()
            return redirect('index')
    except:
        return render(request, "add.html", {"errors": True})
    return render(request, "add.html", {"errors": False})

@login_required(login_url="login")
def delete(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.delete()
        return redirect('index')
    except: return redirect('index')

@login_required(login_url="login")
def mark_complete(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.is_completed = True
        task.save()
        return redirect('index')
    except: return redirect('index')

@login_required(login_url="login")
def mark_incomplete(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.is_completed = False
        task.save()
        return redirect('index')
    except: return redirect('index')



def login_user(request):
    if request.user.is_authenticated:
        return redirect("index")

    if request.method == "GET":
        return render(request, "login.html")

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("index")
        else:
            messages.info(request, "Invalid Credentials")
            return render(request, "login.html")

def logout_user(request):
    logout(request)
    return redirect("login")

def register(request):

    if request.user.is_authenticated:
        return redirect("")
    
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get("username")
            messages.success(request, "Account created successfully for " + user)

            return redirect("login")

    return render(request, "register.html", {"form":form})