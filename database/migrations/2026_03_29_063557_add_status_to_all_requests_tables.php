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
    // إضافة حقل الحالة لكل الجداول إذا لم يكن موجوداً
    foreach (['customer_requests', 'owner_requests', 'leads'] as $table) {
        if (!Schema::hasColumn($table, 'status')) {
            Schema::table($table, function (Blueprint $table) {
                $table->string('status')->default('لم يتم التواصل');
            });
        }
    }
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_requests_tables', function (Blueprint $table) {
            //
        });
    }
};
