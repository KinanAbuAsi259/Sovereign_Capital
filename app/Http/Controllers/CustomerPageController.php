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
         $phone = str_replace([' ', '-', '(', ')'], '', $request->phone);

// 2. إذا كان الرقم يبدأ بـ 0، استبدله برمز النداء (مثال للرمز السوري أو السعودي)
if (str_starts_with($phone, '0')) {
    // افترضنا هنا رمز النداء +963، يمكنك تغييره حسب دولتك
    $phone = '+963' . substr($phone, 1); 
} 
// 3. إذا بدأ الرقم مباشرة بدون 0 وبدون +
elseif (!str_starts_with($phone, '+')) {
    $phone = '+963' . $phone;
}

// 4. دمج الرقم المعدل في الطلب ليتم فحصه في القاعدة
$request->merge(['phone' => $phone]);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
             'phone' => [
        'required',
        'regex:/^([0-9\s\-\+\(\)]*)$/', // يقبل الأرقام، الزائد، والمسافات
        'min:7',
        'max:20',
        'unique:Leads,phone', 
    ],
    'country_code' => 'required|string',
    'email' => 'nullable|email:rfc,dns|unique:users,email',
            
            'governorate' => 'required',
            'property_type' => 'required', // يجب أن يكون من ضمن الـ enum
            'other_property_type' => 'nullable|string', // الحقل الديناميكي
            'additional_details' => 'nullable|string',
            'preferred_location' => 'required',
            'required_area' => 'required',
        ],
        [
        'email.dns' => 'هذا البريد الإلكتروني غير موجود أو غير مفعل.',
        'email.unique' => 'هذا البريد مسجل مسبقاً في نظامنا.',
        'phone.regex' => 'صيغة رقم الهاتف خاطئة، يرجى إدخال أرقام فقط.',
        'phone.unique' => 'هذا الرقم مسجل لدينا بطلب سابق.',
        'phone.min' => 'رقم الهاتف قصير جداً.',
        'name.required'   => 'يرجى إدخال الاسم الكامل لصاحب الطلب.',
        'phone.required'  => 'رقم الهاتف ضروري لنتمكن من التواصل معك.',
            ]
        );
        if ($validated['property_type'] === 'غير ذلك' && ! empty($validated['other_property_type'])) {
            $validated['property_type'] = $validated['other_property_type'];
        }
        // else {
        $validated['phone'] = $validated['country_code'].$validated['phone'];

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
