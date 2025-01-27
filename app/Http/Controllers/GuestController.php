<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('GuestController@index called');

            $today = Carbon::today();
            $viewCheckouts = $request->boolean('checkouts', false);
            $viewCancelled = $request->boolean('cancelled', false); // Added for cancelled bookings view

            $query = Booking::select('id', 'name', 'email', 'phone', 'check_in', 'check_out', 'room_type', 'room_number', 'status')
                ->whereIn('status', ['confirmed', 'cancelled']); 

            if ($viewCheckouts) {
                // Show only today's checkouts
                $bookings = $query->whereDate('check_out', $today)
                    ->orderBy('check_out', 'asc')
                    ->get();
            } elseif ($viewCancelled) {
                // Show only cancelled bookings
                $bookings = $query->where('status', 'cancelled')
                    ->orderBy('created_at', 'desc')
                    ->get();
            } else {
                // Show all active bookings
                $bookings = $query->orderBy('created_at', 'desc')
                    ->get();
            }

            $todayCheckoutCount = Booking::where('status', 'confirmed')
                ->whereDate('check_out', $today)
                ->count();

            Log::info('Retrieved bookings:', [
                'view_checkouts' => $viewCheckouts,
                'view_cancelled' => $viewCancelled,
                'total_bookings' => $bookings->count(),
                'today_checkout_count' => $todayCheckoutCount
            ]);

            return Inertia::render('Guest', [
                'bookings' => $bookings,
                'todayCheckoutCount' => $todayCheckoutCount,
                'viewingCheckouts' => $viewCheckouts,
                'viewingCancelled' => $viewCancelled
            ]);
        } catch (\Exception $e) {
            Log::error('Error in GuestController@index: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            return back()->with('error', 'An error occurred while loading the guest list.');
        }
    }

}
