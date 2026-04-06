<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
    'name', 'email', 'phone', 'country_code', 'password', 'role',
    'can_view_owners', 'can_view_investors', 'can_view_customers',
];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
    'can_view_owners' => 'boolean',
    'can_view_investors' => 'boolean',
    'can_view_customers' => 'boolean',
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
        'role' => \App\Enums\UserRole::class,
    ];

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }
    // داخل كلاس User.php
public function getCanViewOwnersAttribute($value) {
    return $value ?? true; // سيعتبرها true حتى لو العمود غير موجود أو فارغ
}
// كرر الأمر للبقية..
}
