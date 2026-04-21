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
        'unique:leads,phone', 
    ], 
            'country_code' => 'required|string',
            'email' => 'nullable|email:rfc,dns|unique:users,email',
            'governorate' => 'required|string',
            'currency' => 'required|in:سوري,دولار', // الحقل الجديد
            'capital_range' => 'nullable|string',
            'property_type' => 'required|string',
            'location' => 'required|string',
            'area' => 'required|string',
            'investment_goal' => 'required|string',
        ],
            [
    'email.dns' => 'هذا البريد الإلكتروني غير موجود أو غير مفعل.',
    'email.unique' => 'هذا البريد مسجل مسبقاً في نظامنا.',
    'phone.regex' => 'صيغة رقم الهاتف خاطئة، يرجى إدخال أرقام فقط.',
    'phone.unique' => 'هذا الرقم مسجل لدينا بطلب استثمار سابق.',
    'phone.min' => 'رقم الهاتف قصير جداً.',
    'name.required'   => 'يرجى إدخال الاسم الكامل لصاحب الطلب.',
    'phone.required'  => 'رقم الهاتف ضروري لنتمكن من التواصل معك.',
    'budget.required' => 'يرجى تحديد الميزانية المتوقعة للاستثمار.',
            ]);
        $validated['phone'] = $validated['country_code'].$validated['phone'];

        // إزالة country_code لأنه غير موجود في جدول قاعدة البيانات
        unset($validated['country_code']);

        // Lead::create(array_merge($validated, ['status' => 'pending']));
        $lead = Lead::firstOrCreate(
            ['phone' => $validated['phone'], 'status' => 'لم يتم التواصل'],
            array_merge($validated, ['status' => 'لم يتم التواصل'])
        );
        //     if ($request->has('uploaded_media_paths')) {
        //     foreach ($request->uploaded_media_paths as $tempPath) {
        //         $newPath = str_replace('temp_uploads', 'owner_assets/' . $lead->id, $tempPath);
        //         Storage::disk('public')->move($tempPath, $newPath);

        //         // تسجيل الملف في قاعدة البيانات (جدول الميديا الخاص بك)
        //         $lead->media()->create(['path' => $newPath]);
        //     }
        // }

        return redirect()->route('landing');
    }

    public function uploadTemp(Request $request)
    {
        // 1. التحقق من الملفات
        $request->validate([
            'media.*' => 'required|file|max:102400', // حد أقصى 100 ميجا للملف
        ]);

        $paths = [];

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                // 2. تخزين الملف في مجلد مؤقت داخل الـ public storage
                // نستخدم 'public' لكي نستطيع توليد رابط للمعاينة فوراً
                $path = $file->store('temp_uploads', 'public');
                $paths[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'url' => asset('storage/'.$path), // رابط المعاينة
                ];
            }
        }

        // 3. إعادة المسارات لـ React
        return response()->json(['files' => $paths]);
    }
}
