<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourtDetail extends Model
{
    protected $fillable = [
        'arbitration_case_id',
        'court_name',
        'judge_name',
        'order_date',
        'filing_type',
        'petition_number',
        'year',
        'case_title',
    ];
}
