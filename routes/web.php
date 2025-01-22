<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FrontDeskController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\RoomsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/room', function () {
    return Inertia::render('Room');
})->name('room');

Route::get('/frontdesk', [FrontDeskController::class, 'index'])->name('frontdesk');
Route::get('/guest', [GuestController::class, 'index'])->name('guest');
Route::get('/rooms', [RoomsController::class, 'index'])->name('rooms');

Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::post('/guest-information', [BookingController::class, 'guestInformation'])->name('guest.information');
Route::get('/guest-information', [BookingController::class, 'guestInformation'])->name('guest.information.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
