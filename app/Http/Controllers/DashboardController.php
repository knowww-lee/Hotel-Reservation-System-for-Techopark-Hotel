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
        $todayCheckIns = Booking::where('check_in', $today)
            ->where('status', 'confirmed')
            ->count();

        $todayCheckOuts = Booking::where('check_out', $today)
            ->where('status', 'confirmed')
            ->count();

        // Get total and active bookings
        $totalBookings = Booking::count();
        $activeBookings = Booking::where('status', 'confirmed')
            ->where('check_out', '>=', $today)
            ->count();

        // Get contacts for feedback
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'bookingStats' => [
                'todayCheckIns' => $todayCheckIns,
                'todayCheckOuts' => $todayCheckOuts,
                'total' => $totalBookings,
                'totalActive' => $activeBookings,
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