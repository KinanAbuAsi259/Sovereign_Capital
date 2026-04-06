<?php

namespace App\Http\Controllers;

use App\Models\CustomerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerPageController extends Controller
{
    public function index()
    {
        // عرض ملف الـ React الموجود في: resources/js/Pages/CustomerPage.jsx
        return Inertia::render('Customer_page');
    }

    // CustomerPageController.php
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string',
            'country_code' => 'required|string',
            'governorate' => 'required',
            'property_type' => 'required', // يجب أن يكون من ضمن الـ enum
            'other_property_type' => 'nullable|string', // الحقل الديناميكي
            'preferred_location' => 'required',
            'required_area' => 'required',
        ]);
        if ($validated['property_type'] === 'غير ذلك' && ! empty($validated['other_property_type'])) {
            $validated['property_type'] = $validated['other_property_type'];
        }
        // else {
        $validated['phone'] = $validated['country_code'] . $validated['phone'];
    
    // إزالة country_code لأنه غير موجود في جدول قاعدة البيانات
    unset($validated['country_code']);

        unset($validated['other_property_type']);
        // }
        // 2. الحفظ في قاعدة البيانات
        // تأكد أن الموديل الخاص بك (مثلاً PropertyRequest) يحتوي على property_type في مصفوفة $fillable
        CustomerRequest::create($validated);
        CustomerRequest::firstOrCreate(
            ['phone' => $validated['phone'], 'name' => $request->name, 'status' => 'لم يتم التواصل'],
            array_merge($validated, ['status' => 'لم يتم التواصل'])
        );

        return redirect()->route('landing');
        // return redirect()->back()->with('success', 'تم استلام طلب البحث عن عقارك بنجاح، فريقنا سيتواصل معك قريباً!');
    }
}
