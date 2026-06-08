<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class CauseListController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'message' => 'Case Filer Manager Dashboard'
        ]);
    }
}
