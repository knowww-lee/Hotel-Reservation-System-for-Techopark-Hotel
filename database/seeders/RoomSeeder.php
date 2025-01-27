<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    public function run()
    {
        $rooms = [];

        for ($i = 1; $i <= 50; $i++) {
            $rooms[] = [
                'room_number' => 'N' . str_pad($i, 3, '0', STR_PAD_LEFT), 
                'room_type' => 'normal',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        for ($i = 1; $i <= 50; $i++) {
            $rooms[] = [
                'room_number' => 'L' . str_pad($i, 3, '0', STR_PAD_LEFT), 
                'room_type' => 'luxury',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('rooms')->insert($rooms);
    }
}
