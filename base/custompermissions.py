from rest_framework.permissions import BasePermission


class IsVendor(BasePermission):
    def has_permission(self, request, view):
        if request.user.vendor:
            return True
        else:
            return False


