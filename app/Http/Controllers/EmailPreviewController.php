<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailPreviewController extends Controller
{
    public function showBookingReceipt()
    {
        $bookingDetails = [
            'name' => 'Pasado Please',
            'email' => 'Pasado@example.com',
            'phone' => '09123456789',
            'check_in' => '2025-02-01',
            'check_out' => '2025-02-05',
            'room_type' => 'luxury',
            'special_requests' => 'Late check-out'
        ];

        $roomNumber = '101';

        return view('emails.booking_receipt', compact('bookingDetails', 'roomNumber'));
    }
}
