<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClaimantController extends Controller
{
     public function store(Request $request, ArbitrationCase $case)
    {
        $case->claimants()->create($request->all());
        return response()->json(['status' => true]);
    }
}
