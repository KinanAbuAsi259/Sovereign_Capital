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
        $table->string('governorate')->after('location'); 
        $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // لربط الطلب بالمستخدم
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
