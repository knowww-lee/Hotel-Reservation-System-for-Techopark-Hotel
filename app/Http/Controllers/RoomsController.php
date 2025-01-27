<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RoomsController extends Controller
{
    public function index()
    {
        try {
            $rooms = Room::all();

            // Organize rooms into normal and luxury types
            $normalRooms = $rooms->filter(fn($room) => $room->room_type === 'normal')->map(function ($room) {

                $bookingStatus = $room->room_status === 'booked' ? ($room->booking?->status === 'cancelled' ? 'Available' : 'Booked') : 'Available';

                return [
                    'number' => $room->room_number,
                    'type' => $room->room_type,
                    'status' => $bookingStatus,
                    'current_booking' => $bookingStatus === 'Booked' ? [
                        'guest_name' => $room->booking?->name,
                        'check_in' => $room->booking?->check_in,
                        'check_out' => $room->booking?->check_out
                    ] : null
                ];
            })->toArray();

            $luxuryRooms = $rooms->filter(fn($room) => $room->room_type === 'luxury')->map(function ($room) {
                $bookingStatus = $room->room_status === 'booked' ? ($room->booking?->status === 'cancelled' ? 'Available' : 'Booked') : 'Available';

                return [
                    'number' => $room->room_number,
                    'type' => $room->room_type,
                    'status' => $bookingStatus,
                    'current_booking' => $bookingStatus === 'Booked' ? [
                        'guest_name' => $room->booking?->name,
                        'check_in' => $room->booking?->check_in,
                        'check_out' => $room->booking?->check_out
                    ] : null
                ];
            })->toArray();

            $allRooms = array_merge($normalRooms, $luxuryRooms);

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
                'total' => count($allRooms),
                'booked' => $normalStats['booked'] + $luxuryStats['booked'],
                'available' => $normalStats['available'] + $luxuryStats['available'],
                'normal' => $normalStats,
                'luxury' => $luxuryStats
            ];

            Log::info('Room statistics:', [
                'stats' => $stats
            ]);

            return Inertia::render('Rooms', [
                'rooms' => $allRooms,
                'stats' => $stats
            ]);
        } catch (\Exception $e) {
            Log::error('Error in RoomsController@index: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading the rooms.');
        }
    }
}
