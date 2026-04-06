<?php

namespace App\Listeners;

use App\Events\LeadCreated;

class SendLeadNotification
{
    use InteractsWithQueue;

    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(LeadCreated $event): void
    {
        $lead = $event->lead;

        // 1. تسجيل الحدث في ملفات الـ Log (للتاريخ)
        Log::info('تم استقبال طلب استثمار جديد: '.$lead->id.' - الاسم: '.$lead->name);

        // 2. إرسال تنبيه عبر تيليجرام (مثال عملي)
        $message = "📢 طلب استثمار جديد!\nالاسم: {$lead->name}\nالهاتف: {$lead->phone}\nنوع العقار: {$lead->property_type}";

        // استبدل الـ token والـ chat_id ببيانات البوت الخاص بك
        Http::get('https://api.telegram.org/botYOUR_TOKEN/sendMessage', [
            'chat_id' => 'YOUR_CHAT_ID',
            'text' => $message,
        ]);

        // هنا نرسل الإيميل (يمكنك استبداله بـ كود إرسال تيليجرام)
        \Mail::raw("لديك طلب استثمار جديد من: {$lead->name} - هاتف: {$lead->phone}", function ($message) {
            $message->to('your-email@example.com')->subject('طلب استثمار جديد');
        });
    }
}
