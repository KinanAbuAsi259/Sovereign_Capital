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
        Schema::create('customer_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('governorate');
            $table->string('property_type');
            $table->string('preferred_location');
            $table->string('required_area');
            $table->string('email')->nullable();
            $table->text('additional_details')->nullable();
            $table->enum('status', ['لم يتم التواصل', 'تم التواصل'])->default('لم يتم التواصل');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_requests');
    }
};
