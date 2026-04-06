<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            // 1. معالجة الإيميل
            $table->string('email')->nullable()->change();

            // 2. إضافة الهاتف ورمز الدولة (فقط إذا لم يكونا موجودين)
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->unique()->after('name');
            }
            if (!Schema::hasColumn('users', 'country_code')) {
                $table->string('country_code')->after('phone');
            }

            // 3. إضافة الرتبة والصلاحيات
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('broker')->after('country_code');
            }
            if (!Schema::hasColumn('users', 'can_view_owners')) {
                $table->boolean('can_view_owners')->default(false);
            }
            if (!Schema::hasColumn('users', 'can_view_investors')) {
                $table->boolean('can_view_investors')->default(false);
            }
            if (!Schema::hasColumn('users', 'can_view_customers')) {
                $table->boolean('can_view_customers')->default(false);
            }
        });
    }

    public function down(): void {
        // نتركها فارغة لتجنب حذف بيانات حيوية عند الـ Rollback
    }
};
