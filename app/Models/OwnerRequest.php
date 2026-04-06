<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerRequest extends Model
{
    use HasFactory;

    // داخل الكلاس
    protected $attributes = [
        'status' => 'لم يتم التواصل',
    ];

    // تحديد الحقول المسموح بحفظها لضمان عدم حدوث MassAssignmentException
    protected $fillable = [
        'name', 'phone', 'country_code', 'governorate',
        'property_type', 'location', 'area',
        'email', 'additional_details', 'status',
    ];

    public function media()
    {
        return $this->hasMany(OwnerRequestMedia::class, 'owner_request_id');
    }
}
