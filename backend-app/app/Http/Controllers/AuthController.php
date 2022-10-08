<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $credentials = $request->only('Name', 'Password');

        $user = User::where('Name', $credentials['Name'])->first();
        if (!$user) {
            abort(404, 'User not found');
        }

        if ($user->Password !== $credentials['Password']) {
            abort(400, 'Wrong password');
        }

        $token = auth()->login($user);

        return response()->json([
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
        ]);
    }

    public function logout() {
        auth()->logout(true);

        return response()->json([
            'data' => 'User logged out successfully',
        ]);
    }
}
