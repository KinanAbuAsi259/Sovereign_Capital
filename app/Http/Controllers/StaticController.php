<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaticController extends Controller
{
    public function about()
    {
        return Inertia::render('static/About');
    }

    public function workflow()
    {
        return Inertia::render('static/Workflow');
    }

    public function security()
    {
        return Inertia::render('static/Security');
    }
}
