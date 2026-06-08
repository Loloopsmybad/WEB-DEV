<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DeclarationController extends Controller
{
     public function accept(Request $request, ArbitrationCase $case)
    {
        $case->declaration()->create([
            'accepted' => true,
            'accepted_at' => now()
        ]);

        $case->update(['status' => 'submitted']);

        return response()->json(['message' => 'Form submitted']);
    }
}
