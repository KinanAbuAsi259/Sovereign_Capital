<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    // داخل الكلاس
    protected $attributes = [
        'status' => 'لم يتم التواصل',
    ];

    // هذه المصفوفة ضرورية جداً لحفظ البيانات
    // app/Models/Lead.php
    protected $fillable = [
        'name', 'phone', 'email', 'governorate',
        'capital_range', 'property_type', 'company_name',
        'location', 'area', 'investment_goal', 'status',
    ];
}
