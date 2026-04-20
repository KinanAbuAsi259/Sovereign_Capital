<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerRequest extends Model
{
    use HasFactory;

    // أضف هذه الأسطر داخل الكلاس
    // protected $appends = ['area', 'location']; // لضمان ظهورهم عند تحويل الموديل لـ JSON

    // public function getAreaAttribute()
    // {
    //     return $this->required_area ?? 'غير محدد';
    // }

    // Accessor للموقع
    // public function getLocationAttribute()
    // {
    //     return $this->preferred_location ?? 'غير محدد';
    // }

    // داخل الكلاس
    protected $attributes = [
        'status' => 'لم يتم التواصل',
    ];

    // app/Models/CustomerRequest.php
    protected $fillable = [
        'name', 'phone', 'country_code', 'email', 'governorate',
        'property_type', 'preferred_location', 'admin_notes',
        'required_area', 'additional_details', 'status',
    ];
}
