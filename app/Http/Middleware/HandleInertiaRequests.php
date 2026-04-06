<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy; // استيراد Ziggy لضمان عمل الروابط في الفرونت إند

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * تعريف البيانات التي سيتم مشاركتها تلقائياً مع كل صفحات React
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // المحرك الأساسي: إرسال بيانات المستخدم المسجل
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    // نستخدم ->value لأن الدور Enum
                    'role' => $request->user()->role->value,
                ] : null, // إذا لم يكن هناك مستخدم، نرسل null ببساطة
            ],
            // نظام التنبيهات (Flash Messages)
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],

            // البيانات المؤقتة التي أضفتها أنت سابقاً
            'temp_lead_data' => fn () => $request->session()->get('temp_lead_data'),

            // إرسال روابط Ziggy لكي يعمل تابع route() داخل React
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ]);
    }
}
