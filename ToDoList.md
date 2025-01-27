# Laravel Project Setup (Decemeber 19, 2024)

1. Clone the repository:

(In php.ini located at "C:/xampp/php", kindly remove the ; in ;extension=zip to avoid errors when installing composer)
2. Install dependencies:
    composer install
    npm install
    // composer require laravel/breeze --dev // - kahit wag na to
    // php artisan breeze:install // -wag na gawin to

3. Set up the environment:
    cp .env.example .env
    php artisan key:generate

4. Configure your database in the .env file and run: [on Xampp]
    php artisan migrate --seed

5. In the same terminal:
    npm run dev

5. Serve the application in different terminal:
    php artisan serve


6. Clear Cache Before Committing/Add Summary
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear


-----------------------------------------------------------
# January 4, 2025 (Update)

1. Run in the terminal:

    npm install tailwindcss

    npm install --save @fortawesome/fontawesome-free

    npm install --save @fortawesome/fontawesome-svg-core

    npm install --save @fortawesome/free-brands-svg-icons
    
    npm install --save @fortawesome/react-fontawesome

    npm install @fortawesome/free-solid-svg-icons


---------------------------------------------------
# January 17, 2025 (Update)

1. Run in the terminal:
    php artisan migrate:fresh //[Note]: Dropping and then migrating of tables.


-----------------------------------------------------
# January 27, 2025 (Update)

1. Run in the terminal:
    php artisan migrate:fresh
    php artisan db:seed

    log in (para di na need magregister pa):
    admin@example.com
    password