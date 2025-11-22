# Volunteer Signup System - Laravel Edition

A comprehensive volunteer management system converted from Node.js/Express to PHP Laravel with JWT authentication, event management, and availability tracking.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access (Admin, Teacher, Volunteer)
- **Event Management**: Create and manage volunteer events with multiple roles
- **Signup System**: Volunteers can sign up for event roles with capacity limits
- **Availability Tracking**: Teachers can set their availability schedules
- **Conflict Detection**: Automatic detection of scheduling conflicts for teachers

## 📋 Requirements

- PHP 8.1 or higher
- Composer
- MySQL 5.7+ or MariaDB 10.3+
- Apache/Nginx web server

## 🔧 Installation

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Configuration

Copy the example environment file and configure your database:

```bash
copy .env.example .env
```

Edit `.env` file and set your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=volunteer_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Generate JWT Secret

```bash
php artisan jwt:secret
```

This will set the `JWT_SECRET` in your `.env` file.

### 5. Run Database Migrations

```bash
php artisan migrate
```

### 6. Seed Database (Optional)

Create a seeder for roles:

```bash
php artisan make:seeder RoleSeeder
```

Add the following to `database/seeders/RoleSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Setup Coordinator', 'description' => 'Handles event setup'],
            ['name' => 'Registration Staff', 'description' => 'Manages attendee registration'],
            ['name' => 'Greeter', 'description' => 'Welcomes guests'],
            ['name' => 'Cleanup Crew', 'description' => 'Post-event cleanup'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
```

Run the seeder:

```bash
php artisan db:seed --class=RoleSeeder
```

### 7. Start Development Server

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "volunteer"
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```http
GET /api/users/me
Authorization: Bearer {token}
```

#### Logout (Protected)
```http
POST /api/users/logout
Authorization: Bearer {token}
```

### Events

#### List All Events (Public)
```http
GET /api/events
```

#### Get Single Event (Public)
```http
GET /api/events/{id}
```

#### Create Event (Admin Only)
```http
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Community Cleanup Day",
  "description": "Help clean up the local park",
  "event_date": "2024-06-15",
  "start_time": "09:00",
  "end_time": "12:00",
  "location": "Central Park",
  "roles": [
    {
      "role_id": 1,
      "capacity": 10
    },
    {
      "role_id": 2,
      "capacity": 5
    }
  ]
}
```

### Signups

#### Sign Up for Event Role (Protected)
```http
POST /api/signup/{eventRoleId}
Authorization: Bearer {token}
```

### Availability

#### Add Availability (Protected)
```http
POST /api/availability
Authorization: Bearer {token}
Content-Type: application/json

{
  "available_date": "2024-06-15",
  "start_time": "08:00",
  "end_time": "17:00"
}
```

## 🗄️ Database Structure

### Tables

1. **users** - User accounts with roles
2. **events** - Volunteer events
3. **roles** - Available volunteer roles
4. **event_roles** - Junction table linking events to roles with capacity
5. **signups** - User signups for event roles
6. **user_availability** - Teacher availability schedules

## 🔐 User Roles

- **Admin**: Can create events and manage the system
- **Teacher**: Can sign up for events (with availability checks)
- **Volunteer**: Can sign up for events

## 🛡️ Business Logic

### Signup Validations

1. **Capacity Check**: Prevents signups when event role is full
2. **Duplicate Prevention**: Users cannot sign up twice for the same role
3. **Teacher Availability**: Teachers must have availability set for the event date/time
4. **Conflict Detection**: Teachers cannot sign up for overlapping events

## 🧪 Testing

Run tests using PHPUnit:

```bash
php artisan test
```

## 📁 Project Structure

```
app/
├── Exceptions/
│   └── Handler.php
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── AuthController.php
│   │       ├── AvailabilityController.php
│   │       ├── EventController.php
│   │       └── SignupController.php
│   ├── Middleware/
│   │   └── AdminMiddleware.php
│   └── Kernel.php
├── Models/
│   ├── Event.php
│   ├── EventRole.php
│   ├── Role.php
│   ├── Signup.php
│   ├── User.php
│   └── UserAvailability.php
└── Providers/
    ├── AppServiceProvider.php
    └── AuthServiceProvider.php

config/
├── auth.php
├── cors.php
└── jwt.php

database/
├── migrations/
│   ├── 2024_01_01_000001_create_users_table.php
│   ├── 2024_01_01_000002_create_events_table.php
│   ├── 2024_01_01_000003_create_roles_table.php
│   ├── 2024_01_01_000004_create_event_roles_table.php
│   ├── 2024_01_01_000005_create_signups_table.php
│   └── 2024_01_01_000006_create_user_availability_table.php
└── seeders/

routes/
├── api.php
└── web.php
```

## 🔄 Migration from Node.js

This application has been converted from Node.js/Express to Laravel. Key changes:

- **Express** → **Laravel Framework**
- **mysql2** → **Eloquent ORM**
- **bcrypt** → **Laravel Hash Facade**
- **jsonwebtoken** → **tymon/jwt-auth**
- **Raw SQL queries** → **Eloquent Models & Query Builder**
- **Middleware** → **Laravel Middleware**
- **Routes** → **Laravel Routing**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is open-sourced software licensed under the MIT license.

## 💡 Tips

- Always use transactions for complex operations (like signup)
- Validate input data before processing
- Use Laravel's built-in validation features
- Keep controllers thin and use service classes for complex logic
- Follow Laravel best practices and coding standards

## 🐛 Troubleshooting

### JWT Secret Not Set
```bash
php artisan jwt:secret
```

### Database Connection Error
- Check your `.env` database credentials
- Ensure MySQL service is running
- Verify database exists

### Permission Errors
```bash
php artisan cache:clear
php artisan config:clear
```

## 📞 Support

For issues and questions, please create an issue in the repository.
