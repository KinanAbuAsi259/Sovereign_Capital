<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index()
    {
        // عرض ملف الـ React الموجود في: resources/js/Pages/Investor_page.jsx
        return Inertia::render('Investor_page');
    }

    public function store(Request $request)
    {
        Log::info('📥 وصل طلب جديد إلى السيرفر في تمام الساعة: '.now());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'country_code' => 'required|string',
            'email' => 'nullable|email',
            'governorate' => 'required|string',
            'capital_range' => 'nullable|string',
            'property_type' => 'required|string',
            'location' => 'required|string',
            'area' => 'required|string',
            'investment_goal' => 'required|string',
        ],
            [
                'email.email' => 'يرجى إدخال بريد إلكتروني حقيقي.',
                'phone.regex' => 'رقم الهاتف غير صحيح، يرجى استخدام الأرقام فقط.',
            ]);
            $validated['phone'] = $validated['country_code'] . $validated['phone'];
    
    // إزالة country_code لأنه غير موجود في جدول قاعدة البيانات
    unset($validated['country_code']);


        // Lead::create(array_merge($validated, ['status' => 'pending']));
        $lead = Lead::firstOrCreate(
            ['phone' => $validated['phone'], 'status' => 'لم يتم التواصل'],
            array_merge($validated, ['status' => 'لم يتم التواصل'])
        );

        return redirect()->route('landing');
    }
}
