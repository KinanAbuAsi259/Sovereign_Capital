<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('owner_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // الاسم الكامل
            $table->string('phone'); // الرقم
            $table->string('country_code')->default('+963'); // رمز الدولة
            $table->string('governorate'); // المحافظة
            $table->string('property_type'); // نوع العقار (بيت، فيلا، إلخ)
            $table->string('location'); // الموقع
            $table->string('area'); // المساحة
            $table->string('email')->nullable(); // البريد اختياري
            $table->text('additional_details')->nullable(); // تفاصيل إضافية
            $table->enum('status', ['لم يتم التواصل', 'تم التواصل'])->default('لم يتم التواصل');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('owner_requests');
    }
};
