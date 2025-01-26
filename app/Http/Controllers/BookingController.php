<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'room_type' => 'required|in:normal,luxury',
            'adults' => 'required|integer|min:1',
            'children' => 'required|integer|min:0',
            'special_requests' => 'nullable|string'
        ]);

        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        // Get all booked rooms for the given room type and date range
        $bookedRooms = Booking::where('room_type', $validated['room_type'])
            ->where('status', 'confirmed')
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                    });
            })
            ->pluck('room_number')
            ->toArray();

        // Generate all possible room numbers for the room type
        $prefix = $validated['room_type'] === 'luxury' ? 'L' : 'N';
        $allRooms = [];
        for ($i = 1; $i <= 50; $i++) {
            $allRooms[] = $prefix . str_pad($i, 3, '0', STR_PAD_LEFT);
        }

        // Find available rooms
        $availableRooms = array_values(array_diff($allRooms, $bookedRooms));

        if (empty($availableRooms)) {
            return back()->withErrors([
                'room_type' => 'No rooms available for the selected dates and room type.'
            ]);
        }

        // Get the first available room
        $validated['room_number'] = $availableRooms[0];
        $validated['status'] = 'confirmed';

        try {
            $booking = Booking::create($validated);
            
            \Log::info('Created booking:', ['booking' => $booking->toArray()]);

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Booking Successful!',
                'booking' => [
                    'id' => $booking->id,
                    'room_number' => $booking->room_number
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Booking creation failed:', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to create booking']);
        }
    }

    public function guestInformation(Request $request)
    {
        $validated = $request->validate([
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'rooms' => 'required|integer|min:1',
            'guests' => 'required|integer|min:1',
            'room_type' => 'required|in:normal,luxury'
        ]);

        // Check room availability for the selected type
        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        $occupiedRooms = Booking::where('room_type', $validated['room_type'])
            ->where('status', 'confirmed')
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                    });
            })
            ->count();

        $maxRooms = 50; // 50 rooms per type
        $availableRooms = $maxRooms - $occupiedRooms;

        if ($validated['rooms'] > $availableRooms) {
            return back()->withErrors([
                'rooms' => "Only {$availableRooms} {$validated['room_type']} rooms available for the selected dates."
            ]);
        }

        if ($validated['guests'] > $validated['rooms'] * 3) {
            return back()->withErrors([
                'guests' => 'Maximum 3 guests per room allowed.'
            ]);
        }

        // Pass all the validated data to the GuestInformation page
        return Inertia::render('GuestInformation', [
            'booking_data' => [
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'rooms' => $validated['rooms'],
                'guests' => $validated['guests'],
                'room_type' => $validated['room_type'],
            ]
        ]);
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->back();
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,cancelled'
        ]);

        $booking->update($validated);
        return redirect()->back();
    }
}
