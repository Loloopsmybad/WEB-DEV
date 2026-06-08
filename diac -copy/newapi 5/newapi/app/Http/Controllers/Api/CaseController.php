<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ArbitrationCase;

class CaseController extends Controller
{
    public function start()
    {
        $case = ArbitrationCase::create([
            'status' => 'draft',
            'current_step' => 'court'
        ]);

        return response()->json([
            'status' => true,
            'case_id' => $case->id,
            'current_step' => 'court'
        ]);
    }
}
