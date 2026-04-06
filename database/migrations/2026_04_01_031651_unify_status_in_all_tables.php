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
        $tables = ['owner_requests', 'leads', 'customer_requests'];

        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                // نغير الحقل ليكون نصاً ونضع القيمة الافتراضية المطلوبة
                $table->string('status')->default('لم يتم التواصل')->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_tables', function (Blueprint $table) {
            //
        });
    }
};
