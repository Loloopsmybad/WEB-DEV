<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ArbitrationCase;

class CourtController extends Controller
{
    public function store(Request $request, ArbitrationCase $case)
    {
        $data = $request->validate([
            'court_name'       => 'required|string',
            'judge_name'       => 'required|string',
            'order_date'       => 'required|date',
            'filing_type'      => 'required|string',
            'petition_number'  => 'required|string',
            'year'             => 'required|digits:4',
            'case_title'       => 'required|string',
        ]);

        $case->court()->updateOrCreate(
            ['arbitration_case_id' => $case->id],
            $data
        );

        $case->update(['current_step' => 'arbitrator']);

        return response()->json([
            'status' => true,
            'message' => 'Court details saved',
            'next_step' => 'arbitrator',
        ]);
    }
}

