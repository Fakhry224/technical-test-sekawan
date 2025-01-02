<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Signup
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:Admin,Approver,Normal User', // Validasi role
            'employee_id' => 'nullable|exists:employees,employee_id', // Validasi relasi employee_id
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Enkripsi password
            'role' => $request->role,
            'employee_id' => $request->employee_id,
        ]);

        return response()->json([
            'message' => 'Signup successful!',
            'user' => $user,
        ], 201);
    }


    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Ambil user yang berhasil login
            $user = Auth::user();

            return response()->json([
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user->user_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'employee_id' => $user->employee_id,
                ],
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials!',
        ], 401);
    }


    // Logout
    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logged out successfully!',
        ]);
    }
}
