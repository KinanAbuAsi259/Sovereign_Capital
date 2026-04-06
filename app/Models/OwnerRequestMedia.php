<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerRequestMedia extends Model
{
    use HasFactory;
    protected $fillable = ['owner_request_id', 'file_path', 'file_type'];

public function ownerRequest()
{
    return $this->belongsTo(OwnerRequest::class);
}
}
