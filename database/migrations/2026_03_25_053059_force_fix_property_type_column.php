<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB; // استدعاء DB للتعامل المباشر مع قاعدة البيانات

class ForceFixPropertyTypeColumn extends Migration
{
    public function up()
    {
        // استخدام استعلام SQL مباشر لتغيير نوع العمود وإزالة قيود الـ ENUM نهائياً
        // سنحوله إلى VARCHAR(255) ليكون نصاً حراً
        DB::statement('ALTER TABLE customer_requests MODIFY COLUMN property_type VARCHAR(255)');
    }

    public function down()
    {
        // في حال أردت العودة (اختياري)
        DB::statement("ALTER TABLE customer_requests MODIFY COLUMN property_type ENUM('بيت', 'فيلا', 'أرض', 'شاليه', 'غير ذلك')");
    }
}
