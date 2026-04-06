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
    Schema::create('owner_request_media', function (Blueprint $table) {
        $table->id();
        $table->foreignId('owner_request_id')->constrained()->onDelete('cascade');
        $table->string('file_path'); // مسار الملف
        $table->enum('file_type', ['image', 'video']); // نوع الملف
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_request_media');
    }
};
