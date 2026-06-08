<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArbitrationCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'data_json',
        'current_step',   // 🔥 VERY IMPORTANT
        'review_status',
    ];
    
    protected $casts = [
        'data_json' => 'array'
    ];

    public function user()
{
    return $this->belongsTo(\App\Models\User::class);
}

    
}
