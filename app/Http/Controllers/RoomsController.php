<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RoomsController extends Controller
{
    public function index()
    {
        try {
            // Get all confirmed bookings
            $bookings = Booking::where('status', 'confirmed')->get();
            Log::info('Fetched bookings:', ['count' => $bookings->count()]);
            
            // Initialize room arrays
            $normalRooms = [];
            $luxuryRooms = [];
            
            // Create normal rooms (N001-N050)
            for ($i = 1; $i <= 50; $i++) {
                $roomNumber = 'N' . str_pad($i, 3, '0', STR_PAD_LEFT);
                $booking = $bookings->firstWhere('room_number', $roomNumber);
                
                $normalRooms[] = [
                    'number' => $roomNumber,
                    'type' => 'normal',
                    'status' => $booking ? 'Booked' : 'Available',
                    'current_booking' => $booking ? [
                        'guest_name' => $booking->name,
                        'check_in' => $booking->check_in,
                        'check_out' => $booking->check_out
                    ] : null
                ];
            }
            
            // Create luxury rooms (L001-L050)
            for ($i = 1; $i <= 50; $i++) {
                $roomNumber = 'L' . str_pad($i, 3, '0', STR_PAD_LEFT);
                $booking = $bookings->firstWhere('room_number', $roomNumber);
                
                $luxuryRooms[] = [
                    'number' => $roomNumber,
                    'type' => 'luxury',
                    'status' => $booking ? 'Booked' : 'Available',
                    'current_booking' => $booking ? [
                        'guest_name' => $booking->name,
                        'check_in' => $booking->check_in,
                        'check_out' => $booking->check_out
                    ] : null
                ];
            }
            
            // Combine all rooms
            $rooms = array_merge($normalRooms, $luxuryRooms);
            
            // Calculate statistics
            $normalStats = [
                'total' => count($normalRooms),
                'booked' => count(array_filter($normalRooms, fn($room) => $room['status'] === 'Booked')),
            ];
            $normalStats['available'] = $normalStats['total'] - $normalStats['booked'];
            
            $luxuryStats = [
                'total' => count($luxuryRooms),
                'booked' => count(array_filter($luxuryRooms, fn($room) => $room['status'] === 'Booked')),
            ];
            $luxuryStats['available'] = $luxuryStats['total'] - $luxuryStats['booked'];
            
            $stats = [
                'total' => count($rooms),
                'booked' => $normalStats['booked'] + $luxuryStats['booked'],
                'available' => $normalStats['available'] + $luxuryStats['available'],
                'normal' => $normalStats,
                'luxury' => $luxuryStats
            ];
            
            Log::info('Room statistics:', [
                'total_bookings' => $bookings->count(),
                'stats' => $stats
            ]);

            return Inertia::render('Rooms', [
                'rooms' => $rooms,
                'stats' => $stats
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error in RoomsController@index: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading the rooms.');
        }
    }
}
