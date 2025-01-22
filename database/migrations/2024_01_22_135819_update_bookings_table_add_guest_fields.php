<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Drop the guest_id foreign key
            $table->dropForeign(['guest_id']);
            $table->dropColumn('guest_id');
            
            // Add guest fields directly to bookings table
            $table->string('name');
            $table->string('email');
            $table->string('phone');
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['name', 'email', 'phone']);
            $table->foreignId('guest_id')->constrained();
        });
    }
}; 