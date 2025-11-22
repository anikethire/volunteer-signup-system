# Volunteer Signup System - Setup Instructions

## Quick Start Guide

Follow these steps to convert your Node.js application to Laravel:

### Step 1: Install Composer Dependencies

```powershell
composer install
```

If you don't have Composer installed, download it from https://getcomposer.org/

### Step 2: Configure Environment

```powershell
copy .env.example .env
```

Edit the `.env` file with your database credentials:
```
DB_DATABASE=volunteer_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Step 3: Generate Application Key

```powershell
php artisan key:generate
```

### Step 4: Install JWT Authentication Package

The composer.json already includes tymon/jwt-auth. After running `composer install`, publish the JWT config:

```powershell
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

Generate JWT secret:

```powershell
php artisan jwt:secret
```

### Step 5: Create Database

Create a MySQL database named `volunteer_db` (or use the name you specified in .env):

```sql
CREATE DATABASE volunteer_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 6: Run Migrations

```powershell
php artisan migrate
```

### Step 7: Seed Database with Roles

```powershell
php artisan db:seed --class=RoleSeeder
```

### Step 8: Start Development Server

```powershell
php artisan serve
```

Your Laravel API will be available at: http://localhost:8000

## Testing the API

### Register a new user:
```powershell
curl -X POST http://localhost:8000/api/users/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"role\":\"volunteer\"}'
```

### Login:
```powershell
curl -X POST http://localhost:8000/api/users/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

### Get Events (Public):
```powershell
curl http://localhost:8000/api/events
```

## Frontend Integration

The existing HTML files (index.html, events.html, signup.html, availability.html) can be updated to use the new Laravel API endpoints.

Update the API base URL in your JavaScript from:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = 'http://localhost:8000/api';
```

## File Structure Comparison

### Node.js (Old) → Laravel (New)

- `server.js` → `routes/api.php` + `bootstrap/app.php`
- `config/db.js` → `config/database.php`
- `models/User.js` → `app/Models/User.php`
- `controllers/userController.js` → `app/Http/Controllers/Api/AuthController.php`
- `middleware/authMiddleware.js` → Laravel JWT middleware (built-in)
- `routes/userRoutes.js` → `routes/api.php`

## Key Differences

1. **Database Access**: Raw SQL queries → Eloquent ORM
2. **Authentication**: Manual JWT → tymon/jwt-auth package
3. **Routing**: Express Router → Laravel Routes
4. **Validation**: Manual validation → Laravel Validation
5. **Middleware**: Custom → Laravel Middleware

## Troubleshooting

### Issue: "Class 'Tymon\JWTAuth\Providers\LaravelServiceProvider' not found"
**Solution**: Run `composer install` to install dependencies

### Issue: "JWT Secret not set"
**Solution**: Run `php artisan jwt:secret`

### Issue: "SQLSTATE[HY000] [1049] Unknown database"
**Solution**: Create the database manually or update DB_DATABASE in .env

### Issue: "Class not found" errors
**Solution**: Run `composer dump-autoload`

### Issue: Permission denied on storage
**Solution**: 
```powershell
icacls storage /grant Everyone:(OI)(CI)F /T
icacls bootstrap/cache /grant Everyone:(OI)(CI)F /T
```

## Production Deployment

Before deploying to production:

1. Set `APP_ENV=production` and `APP_DEBUG=false` in .env
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Run `php artisan view:cache`
5. Set proper permissions on storage and bootstrap/cache
6. Configure your web server (Apache/Nginx)
7. Use a proper database user with limited privileges
8. Set a strong APP_KEY and JWT_SECRET

## Additional Resources

- Laravel Documentation: https://laravel.com/docs
- JWT Auth Documentation: https://jwt-auth.readthedocs.io/
- Laravel API Tutorial: https://laravel.com/docs/api-resources

## Need Help?

Refer to README_LARAVEL.md for detailed API documentation and feature descriptions.
