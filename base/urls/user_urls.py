from os import name
from django.urls import path, include
from base.views import user_views as views




urlpatterns = [

    path('profile/', views.getUserProfile, name="users-profile"),
    path('', views.getUsers, name="users"),
    path('register/', views.registerUser, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
