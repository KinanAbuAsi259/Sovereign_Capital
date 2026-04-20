<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    // لا نحتاج لـ Accessors هنا لأن الأسماء مطابقة، لكن سنضيف $appends للتوحيد
    // protected $appends = ['area', 'location'];

    // داخل الكلاس
    protected $attributes = [
        'status' => 'لم يتم التواصل',
    ];

    // هذه المصفوفة ضرورية جداً لحفظ البيانات
    // app/Models/Lead.php
    protected $fillable = [
        'name', 'phone', 'email', 'governorate', 'currency',
        'capital_range', 'property_type', 'company_name', 'admin_notes',
        'location', 'area', 'investment_goal', 'status',
    ];
}
