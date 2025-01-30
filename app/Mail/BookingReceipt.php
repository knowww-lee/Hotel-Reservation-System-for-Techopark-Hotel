<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingReceipt extends Mailable
{
    use Queueable, SerializesModels;

    public $bookingDetails;
    public $roomNumber;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($bookingDetails, $roomNumber)
    {
        $this->bookingDetails = $bookingDetails;
        $this->roomNumber = $roomNumber;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
                    ->subject('Booking Receipt')
                    ->view('emails.booking_receipt')
                    ->with([
                        'bookingDetails' => $this->bookingDetails,
                        'roomNumber' => $this->roomNumber
                    ]);
    }
}