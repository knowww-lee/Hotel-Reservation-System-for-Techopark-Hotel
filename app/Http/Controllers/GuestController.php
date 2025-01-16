<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GuestController extends Controller
{
    public function index()
    {
        return Inertia::render('Guest'); 
    }
}
