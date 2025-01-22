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

        $booking = Booking::create($validated);

        return redirect()->back()->with('success', 'Booking Successful!');
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
}
