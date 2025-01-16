<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RoomsController extends Controller
{
    public function index()
    {
        return Inertia::render('Rooms'); 
    }
}
