<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FrontDeskController extends Controller
{
    public function index()
    {
        return Inertia::render('FrontDesk'); 
    }
}

