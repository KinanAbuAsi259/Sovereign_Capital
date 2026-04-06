<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('customer_requests', function (Blueprint $table) {
            // تغيير نوع الحقل ليكون نصاً عادياً يقبل أي قيمة
            $table->string('property_type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('customer_requests', function (Blueprint $table) {
            // للعودة للحالة السابقة إذا لزم الأمر
            $table->enum('property_type', ['بيت', 'فيلا', 'أرض', 'شاليه', 'غير ذلك'])->change();
        });
    }
};
