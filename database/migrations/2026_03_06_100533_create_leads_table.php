<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('leads', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // اسم المستثمر
        $table->string('phone'); // رقم الواتساب
        $table->string('capital_range'); // نطاق رأس المال
        $table->string('property_type'); // نوع العقار المهتم به
        $table->string('status')->default('new'); // الحالة: new, in-process, closed
        $table->foreignId('broker_id')->nullable()->constrained('users'); // الوسيط المسند له الطلب
        $table->text('notes')->nullable(); // ملاحظات الإدارة
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
