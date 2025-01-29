<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // First drop the existing enum constraint
            DB::statement("ALTER TABLE bookings MODIFY status ENUM('confirmed', 'cancelled', 'completed') NOT NULL DEFAULT 'confirmed'");
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Revert back to original enum values
            DB::statement("ALTER TABLE bookings MODIFY status ENUM('confirmed', 'cancelled') NOT NULL DEFAULT 'confirmed'");
        });
    }
}; 