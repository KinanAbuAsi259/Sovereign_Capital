<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description', 'location',
        'price', 'area', 'type', 'images', 'status',
    ];

    // هذه هي الخطوة التي طلبت تعلمها:
    protected $casts = [
        'images' => 'array', // سيقوم لارافل بعمل json_encode و json_decode تلقائياً
    ];
}
