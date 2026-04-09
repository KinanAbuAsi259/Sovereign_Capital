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
        // 1. التحقق من صحة البيانات
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string',
            'country_code' => 'required|string',
            'governorate' => 'required|string',
            'property_type' => 'required|string',
            'other_property_type' => 'nullable|string', // الحقل الديناميكي في الواجهة
            'location' => 'required|string',
            'area' => 'required|string',
            'email' => 'nullable|email',
            'additional_details' => 'nullable|string',
            'media.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov|max:102400', // 100MB للملف
        ]);

        // 2. منطق دمج "نوع العقار" إذا اختار "غير ذلك"
        if ($validated['property_type'] === 'غير ذلك' && ! empty($validated['other_property_type'])) {
            $validated['property_type'] = $validated['other_property_type'];
        }

        // 3. تنظيف المصفوفة من الحقل الزائد قبل الحفظ في قاعدة البيانات
        unset($validated['other_property_type']);
        $validated['phone'] = $validated['country_code'] . $validated['phone'];
    
    // إزالة country_code لأنه غير موجود في جدول قاعدة البيانات
    unset($validated['country_code']);


        // 4. الحفظ في جدول owner_requests
        $ownerRequest = OwnerRequest::firstOrCreate(
            ['phone' => $validated['phone'], 'location' => $request->location, 'status' => 'لم يتم التواصل'],
            array_merge($validated, ['status' => 'لم يتم التواصل'])
        );
        // 2. معالجة الملفات المرفوعة (صور وفيديوهات)
        // if ($request->hasFile('media')) {
        //     foreach ($request->file('media') as $file) {
        //         $path = $file->store('owner_assets', 'public'); // حفظ في storage/app/public/owner_assets

        //         // تحديد النوع بناءً على الامتداد
        //         $extension = $file->getClientOriginalExtension();
        //         $type = in_array($extension, ['mp4', 'mov']) ? 'video' : 'image';

        //         OwnerRequestMedia::create([
        //             'owner_request_id' => $ownerRequest->id,
        //             'file_path' => $path,
        //             'file_type' => $type,
        //         ]);
        //     }
        // }
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
