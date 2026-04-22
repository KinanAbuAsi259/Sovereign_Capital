<?php

namespace App\Http\Controllers;

// الاستدعاءات الهامة لضمان عمل الكود
use App\Models\OwnerRequest; // استدعاء الموديل الخاص بالبائعين
use App\Models\OwnerRequestMedia; // للتعامل مع البيانات القادمة
use Illuminate\Http\Request; // لعرض واجهة الـ React
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OwnerPageController extends Controller
{
    /**
     * عرض صفحة تقديم عرض البيع
     */
    public function index()
    {
        return Inertia::render('Owner_page'); // تأكد أن هذا المسار يتطابق مع اسم ملف الـ React في resources/js/Pages/Owner_page.jsx
    }

    /**
     * حفظ طلب البيع الجديد
     */
    public function store(Request $request)
    {
          $phoneBody = preg_replace('/[^\d]/', '', $request->phone);

// 2. دمج رمز الدولة مع الرقم قبل التحقق لضمان فحص الرقم الكامل
// ملاحظة: تأكدنا هنا من حذف أي أصفار في بداية الرقم المدخل
$fullPhone = $request->country_code . ltrim($phoneBody, '0');

// 3. تحديث الطلب بالرقم الكامل قبل البدء بالتحقق
$request->merge(['phone' => $fullPhone]);
        // 1. التحقق من صحة البيانات
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => [
        'required',
        'regex:/^([0-9\s\-\+\(\)]*)$/', // يقبل الأرقام، الزائد، والمسافات
        'min:7',
        'max:20',
        'unique:owner_requests,phone', 
    ],
            'country_code' => 'required|string',
            'governorate' => 'required|string',
            'property_type' => 'required|string',
            'other_property_type' => 'nullable|string', // الحقل الديناميكي في الواجهة
            'location' => 'required|string',
            'area' => 'required|string',
            'email' => 'nullable|email:rfc,dns|unique:users,email',
            'additional_details' => 'nullable|string',
            'media.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov|max:102400', // 100MB للملف
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

        // 2. منطق دمج "نوع العقار" إذا اختار "غير ذلك"
        if ($validated['property_type'] === 'غير ذلك' && ! empty($validated['other_property_type'])) {
            $validated['property_type'] = $validated['other_property_type'];
        }

        // 3. تنظيف المصفوفة من الحقل الزائد قبل الحفظ في قاعدة البيانات
        unset($validated['other_property_type']);
        // $validated['phone'] = $validated['country_code'] . $validated['phone'];
    
    // إزالة country_code لأنه غير موجود في جدول قاعدة البيانات
    unset($validated['country_code']);


        // 4. الحفظ في جدول owner_requests
        $ownerRequest = OwnerRequest::create(
            array_merge($validated, ['status' => 'لم يتم التواصل'])
        );
       
        // داخل دالة store في OwnerPageController
if ($request->has('uploaded_media_paths')) {
    foreach ($request->uploaded_media_paths as $tempPath) {
        // tempPath يكون مثلاً: temp_uploads/xyz.jpg
        $fileName = basename($tempPath);
        $newPath = "owner_assets/" . $ownerRequest->id . "/" . $fileName;

        // التأكد من وجود الملف في مجلد temp ونقله
        if (Storage::disk('public')->exists($tempPath)) {
            Storage::disk('public')->move($tempPath, $newPath);

            OwnerRequestMedia::create([
                'owner_request_id' => $ownerRequest->id,
                'file_path' => $newPath, // نستخدم الاسم الصحيح هنا
                'file_type' => $this->getFileType($fileName),
            ]);
        }
    }
}

        // 5. العودة مع رسالة نجاح
        return redirect()->route('landing');
    }
    private function getFileType($fileName)
{
    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $videoExtensions = ['mp4', 'mov', 'avi', 'wmv'];
    return in_array($extension, $videoExtensions) ? 'video' : 'image';
}
}
