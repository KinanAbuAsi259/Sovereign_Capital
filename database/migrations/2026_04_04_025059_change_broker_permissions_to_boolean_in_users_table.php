<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // نستخدم change() لتحويل النوع، مع إضافة default(false) للأمان
            $table->boolean('can_view_owners')->default(false)->change();
            $table->boolean('can_view_investors')->default(false)->change();
            $table->boolean('can_view_customers')->default(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // للعودة للحالة السابقة إذا لزم الأمر
            $table->tinyInteger('can_view_owners')->default(0)->change();
            $table->tinyInteger('can_view_investors')->default(0)->change();
            $table->tinyInteger('can_view_customers')->default(0)->change();
        });
    }
};