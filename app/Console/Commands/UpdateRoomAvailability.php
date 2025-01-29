<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateRoomAvailability extends Command
{
    protected $signature = 'rooms:update-availability';
    protected $description = 'Update room availability based on check-out dates';

    public function handle()
    {
        try {
            DB::beginTransaction();

            $today = Carbon::today();
            
            // Get all confirmed bookings where check-out date has passed
            $expiredBookings = Booking::where('status', 'confirmed')
                ->whereDate('check_out', '<=', $today)
                ->get();

            foreach ($expiredBookings as $booking) {
                // Update room status to available
                Room::where('room_number', $booking->room_number)
                    ->update([
                        'room_status' => 'available',
                        'booking_id' => null
                    ]);

                // Update booking status to completed
                $booking->update(['status' => 'completed']);

                Log::info('Room automatically marked as available:', [
                    'room_number' => $booking->room_number,
                    'booking_id' => $booking->id,
                    'check_out_date' => $booking->check_out
                ]);
            }

            DB::commit();
            $this->info('Room availability updated successfully.');
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating room availability: ' . $e->getMessage());
            $this->error('Failed to update room availability.');
        }
    }
} 