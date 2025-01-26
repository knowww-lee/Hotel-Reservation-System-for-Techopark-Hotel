<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/room', function () {
    return Inertia::render('Room');
})->name('room');

// Guest booking routes
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::post('/guest-information', [BookingController::class, 'guestInformation'])->name('guest.information');
Route::get('/guest-information', [BookingController::class, 'guestInformation'])->name('guest.information.show');

// Protected routes
Route::middleware(['auth'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/rooms', [RoomsController::class, 'index'])->name('rooms');
    Route::get('/guest', [GuestController::class, 'index'])->name('guest');

    // Booking management routes
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');
    Route::put('/bookings/{booking}/status', [BookingController::class, 'updateStatus'])->name('bookings.update.status');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
