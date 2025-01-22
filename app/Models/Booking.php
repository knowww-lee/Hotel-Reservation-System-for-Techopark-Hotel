<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'check_in',
        'check_out',
        'room_type',
        'adults',
        'children',
        'special_requests',
        'status'
    ];

    protected $casts = [
        'check_in' => 'datetime',
        'check_out' => 'datetime'
    ];

    /**
     * Get the guest that owns the booking.
     */
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
