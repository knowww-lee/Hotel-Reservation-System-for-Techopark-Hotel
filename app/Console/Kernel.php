<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        // Run the command every hour to check for expired bookings
        $schedule->command('rooms:update-availability')
                ->hourly()
                ->withoutOverlapping()
                ->appendOutputTo(storage_path('logs/room-availability.log'));
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
} 