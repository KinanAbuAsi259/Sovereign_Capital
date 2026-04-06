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
    Schema::table('users', function (Blueprint $table) {
        // تحويل الإيميل لاختياري (دائماً آمن)
        $table->string('email')->nullable()->change(); 

        // لا تضف العمود إلا إذا كان غير موجود
        if (!Schema::hasColumn('users', 'phone')) {
            $table->string('phone')->unique()->after('name');
        }

        if (!Schema::hasColumn('users', 'country_code')) {
            $table->string('country_code')->after('phone');
        }
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
