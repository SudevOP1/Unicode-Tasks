from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class CreateUserForm(UserCreationForm):
    class Meta:
        model  = User
        fields = ["username", "email", "password1", "password2"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["username"] .widget.attrs.update({
            "class"      : "register-input",
            "placeholder": "Username",
        })
        self.fields["email"]    .widget.attrs.update({
            "class"      : "register-input",
            "placeholder": "example@fake.com",
        })
        self.fields["password1"].widget.attrs.update({
            "class"      : "register-input",
            "placeholder": "Password",
        })
        self.fields["password2"].widget.attrs.update({
            "class"      : "register-input",
            "placeholder": "Re-enter Password",
        })