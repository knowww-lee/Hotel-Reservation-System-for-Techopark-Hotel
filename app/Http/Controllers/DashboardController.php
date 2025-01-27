<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // Get today's check-ins and check-outs
        $todayCheckIns = Booking::whereDate('check_in', $today)
            ->where('status', 'confirmed')
            ->count();

        $todayCheckOuts = Booking::whereDate('check_out', $today)
            ->where('status', 'confirmed')
            ->count();

        \Log::info('Today\'s date: ' . $today);
        \Log::info('Today\'s check-ins count: ' . $todayCheckIns);
        \Log::info('Today\'s check-outs count: ' . $todayCheckOuts);

        // Get total and active bookings
        $totalBookings = Booking::count();
        $activeBookings = Booking::where('status', 'confirmed')
            ->where('check_out', '>=', $today)
            ->count();

        // Calculate available normal and luxury rooms
        $totalNormalRooms = 50;
        $totalLuxuryRooms = 50;

        $bookedNormalRooms = Booking::where('room_type', 'normal')
            ->where('status', 'confirmed')
            ->count();

        $bookedLuxuryRooms = Booking::where('room_type', 'luxury')
            ->where('status', 'confirmed')
            ->count();

        $availableNormalRooms = $totalNormalRooms - $bookedNormalRooms;
        $availableLuxuryRooms = $totalLuxuryRooms - $bookedLuxuryRooms;

        // Get contacts for feedback
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'bookingStats' => [
                'todayCheckIns' => $todayCheckIns,
                'todayCheckOuts' => $todayCheckOuts,
                'total' => $totalBookings,
                'totalActive' => $activeBookings,
                'availableNormal' => $availableNormalRooms,
                'availableLuxury' => $availableLuxuryRooms,
            ],
            'roomStats' => [
                'occupied' => $activeBookings,
                'available' => 100 - $activeBookings,
                'total' => 100,
            ],
            'contacts' => $contacts,
        ]);
    }
}