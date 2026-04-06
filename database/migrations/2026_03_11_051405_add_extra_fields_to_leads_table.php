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
        Schema::table('leads', function (Blueprint $table) {
            // إضافة الحقول المفقودة إذا لم تكن موجودة
            if (! Schema::hasColumn('leads', 'email')) {
                $table->string('email')->nullable()->after('phone');
            }
            if (! Schema::hasColumn('leads', 'capital_range')) {
                $table->string('capital_range')->nullable()->after('governorate');
            }
            // أضف أي حقل آخر يظهر لك فيه خطأ "Unknown column" بنفس الطريقة
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            //
        });
    }
};
