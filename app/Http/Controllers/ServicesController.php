<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index()
    {
        return Inertia::render('Services'); 
    }
}

