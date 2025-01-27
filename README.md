# Hotel Reservation System

A modern hotel reservation system built with Laravel, React, and Inertia.js.

## Prerequisites

- PHP >= 8.1
- Node.js >= 16.x
- Composer
- MySQL >= 8.0
- XAMPP (recommended) or similar local development environment

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Hotel-Reservation-System.git
cd Hotel-Reservation-System
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Create a copy of the environment file:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Configure your database in the `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hotel_reservation_db
DB_USERNAME=root
DB_PASSWORD=
```

7. Create the database:
- Start XAMPP and ensure MySQL service is running
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named `hotel_reservation_db`

8. Run database migrations:
```bash
php artisan migrate:fresh
```

9. Build assets:
```bash
npm run dev
```

10. Start the development server:
```bash
php artisan serve
```

## Running the Application

1. Ensure XAMPP is running (Apache and MySQL services)
2. In one terminal, run: `npm run dev`
3. In another terminal, run: `php artisan serve`
4. Visit `http://localhost:8000` in your browser

## Features

- User authentication (Login/Register)
- Dashboard with booking statistics
- Room management
- Guest management
- Booking system with room type selection
- Contact form with feedback system

## Tech Stack

- Backend: Laravel 10
- Frontend: React with Inertia.js
- Styling: Tailwind CSS
- Database: MySQL
- Icons: Font Awesome
- UI Components: Custom components with Tailwind

## Troubleshooting

1. If you see "No application encryption key has been specified":
```bash
php artisan key:generate
```

2. If you have database connection issues:
- Ensure MySQL is running in XAMPP
- Check your `.env` database credentials
- Create the database if it doesn't exist

3. If assets are not loading:
```bash
npm install
npm run dev
```

4. Clear application cache if needed:
```bash
php artisan config:clear
php artisan cache:clear
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.