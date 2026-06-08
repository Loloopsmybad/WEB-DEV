<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminController extends Controller
{
     public function dashboard()
    {
        return response()->json([
            'total_users' => User::where('role', 'user')->count(),
            'total_admins' => User::where('role', 'admin')->count(),
        ]);
    }

    // Create new client user
    public function createUser(Request $request)
    {
        $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email|unique:users,email',
        ]);

        // Auto generate password
        $plainPassword = Str::random(8);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($plainPassword),
            'role'     => 'user',
        ]);

        return response()->json([
            'status'   => true,
            'message'  => 'User created successfully',
            'login'    => [
                'email'    => $user->email,
                'password' => $plainPassword,
            ],
        ]);
    }
}
