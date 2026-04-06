<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerRequest extends Model
{
    use HasFactory;

    // داخل الكلاس
    protected $attributes = [
        'status' => 'لم يتم التواصل',
    ];

    // app/Models/CustomerRequest.php
    protected $fillable = [
        'name', 'phone', 'country_code', 'email', 'governorate',
        'property_type', 'preferred_location',
        'required_area', 'additional_details', 'status',
    ];
}
