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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // الوسيط صاحب العقار
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->decimal('price', 15, 2);
            $table->string('area'); // المساحة
            $table->string('type'); // شقة، فيلا، أرض
            $table->json('images')->nullable(); // تخزين مسارات الصور
            $table->string('status')->default('available'); // متاح، محجوز، مباع
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
