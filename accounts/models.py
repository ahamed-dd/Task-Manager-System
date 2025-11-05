from django.contrib.auth.models import AbstractUser

# AbstractUser is a builtin user model which have username and password and other attributes for use
# There is also AbstractBaseUser for advanced use.
class User(AbstractUser):
    pass
    
    
