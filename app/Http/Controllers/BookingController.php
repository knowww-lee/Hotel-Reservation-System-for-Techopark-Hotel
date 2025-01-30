<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
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

        // Get all booked room numbers for the given type and date range
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

        // Get available rooms 
        $availableRooms = Room::where('room_type', $validated['room_type'])
            ->whereNotIn('room_number', $bookedRooms)
            ->where(function($query) {
                $query->where('room_status', 'available')
                      ->orWhere('room_status', 'cancelled');
            })
            ->first();
            
        if (!$availableRooms) {
            return response()->json([
                'success' => false,
                'message' => 'No rooms available for the selected dates and room type.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Create the booking
            $booking = Booking::create(array_merge($validated, [
                'room_number' => $availableRooms->room_number,
                'status' => 'confirmed'
            ]));

            // Update the room status to booked and associate it with the booking
            $availableRooms->update([
                'room_status' => 'booked',
                'booking_id' => $booking->id
            ]);

            DB::commit();

            \Log::info('Created booking:', ['booking' => $booking->toArray()]);

            return response()->json([
                'success' => true,
                'message' => 'Booking Successful!',
                'booking' => [
                    'id' => $booking->id,
                    'room_number' => $booking->room_number
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Booking creation failed:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking'
            ], 500);
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

        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        // Get available rooms count for the selected type and date range
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

        $availableRooms = Room::where('room_type', $validated['room_type'])
            ->whereNotIn('room_number', $bookedRooms)
            ->where('room_status', 'available')
            ->count();

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
        DB::beginTransaction();

        try {
            // Set the room status to available
            Room::where('room_number', $booking->room_number)
                ->update(['room_status' => 'available', 'booking_id' => null]);

            // Delete the booking
            $booking->delete();

            DB::commit();

            return redirect()->back()->with('success', 'Booking deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Booking deletion failed:', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to delete booking']);
        }
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,cancelled'
        ]);

        DB::beginTransaction();

        try {
            if ($validated['status'] === 'cancelled') {
                // Set the room status to available
                Room::where('room_number', $booking->room_number)
                    ->update(['room_status' => 'available', 'booking_id' => null]);
            } elseif ($validated['status'] === 'confirmed' && $booking->status === 'cancelled') {
                // Check if the room is already occupied
                $room = Room::where('room_number', $booking->room_number)->first();
                
                if ($room->room_status === 'booked') {
                    // Find another available room of the same type
                    $availableRoom = Room::where('room_type', $room->room_type)
                        ->where('room_status', 'available')
                        ->first();
                    
                    if ($availableRoom) {
                        // Update the booking with the new room number
                        $booking->room_number = $availableRoom->room_number;
                        $booking->save();

                        // Set the new room status to booked
                        $availableRoom->update(['room_status' => 'booked', 'booking_id' => $booking->id]);
                    } else {
                        // Handle the case where no available room is found
                        // You can throw an exception or return an error response
                        throw new \Exception('No available room found.');
                    }
                } else {
                    // Set the room status to booked if the room is not occupied
                    $room->update(['room_status' => 'booked', 'booking_id' => $booking->id]);
                }
            }

            // Update the booking status
            $booking->update($validated);

            DB::commit();

            return redirect()->back()->with('success', 'Booking status updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Booking status update failed:', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to update booking status']);
        }
    }

    public function updateCheckout(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'check_out' => [
                'required',
                'date',
                'after_or_equal:' . $booking->check_in
            ]
        ]);

        $today = Carbon::today();
        $newCheckout = Carbon::parse($validated['check_out']);
        
        if ($newCheckout->lessThanOrEqualTo($today)) {
            // Update room status to available
            Room::where('room_number', $booking->room_number)
                ->update(['room_status' => 'available', 'booking_id' => null]);

            // Update booking with new check-out date and mark as completed
            $booking->update([
                'check_out' => $validated['check_out'],
                'status' => 'completed'
            ]);

            // Log the checkout
            \Log::info('Guest checked out:', [
                'booking_id' => $booking->id,
                'room_number' => $booking->room_number,
                'checkout_date' => $validated['check_out']
            ]);
        } else {
            // Just update the check-out date
            $booking->update([
                'check_out' => $validated['check_out']
            ]);
        }

        return redirect()->back();
    }
}
