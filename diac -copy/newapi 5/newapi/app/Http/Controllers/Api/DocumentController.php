<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
     public function upload(Request $request, ArbitrationCase $case)
    {
        $path = $request->file('file')->store('documents');
        $case->documents()->create([
            'type' => $request->type,
            'file_path' => $path
        ]);
        return response()->json(['status' => true]);
    }
}
