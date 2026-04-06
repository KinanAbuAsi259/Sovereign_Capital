<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function create()
    {
        // عرض صفحة إضافة العقار (التي صممنا واجهتها HTML سابقاً)
        return Inertia::render('Broker/PropertyCreate');
    }

    public function store(Request $request)
    {
        // 1. التحقق من البيانات (Validation)
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'area' => 'required|string',
            'type' => 'required|string',
            'images' => 'required|array', // نتوقع مصفوفة ملفات
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048', // شروط كل صورة
        ]);

        // 2. منطق معالجة الصور المتعددة
        $imagePaths = []; // مصفوفة فارغة لتجميع المسارات

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // تخزين الصورة في مجلد 'properties' داخل الـ storage/app/public
                // التابع store يعيد مساراً فريداً تلقائياً لمنع تكرار الأسماء
                $path = $image->store('properties', 'public');
                $imagePaths[] = $path;
            }
        }

        // 3. تخزين البيانات في قاعدة البيانات
        Property::create([
            'user_id' => auth()->id(), // ربط العقار بالوسيط الحالي
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'price' => $validated['price'],
            'area' => $validated['area'],
            'type' => $validated['type'],
            // تحويل مصفوفة المسارات إلى JSON تلقائياً (بفضل خاصية الـ Casts في الموديل)
            'images' => $imagePaths,
        ]);

        // 4. التوجيه بعد النجاح مع رسالة فلاش
        return redirect()->route('broker.dashboard')
            ->with('success', 'تم إدراج العقار في المحفظة الاستراتيجية بنجاح.');
    }
}
