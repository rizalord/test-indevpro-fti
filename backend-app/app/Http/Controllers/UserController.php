<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request) {
        $users = User::query()
            ->where('Name', 'like', "%{$request->input('name')}%")
            ->where('Status', '!=', 1)
            ->orderBy('Name')
            ->paginate(10);
            
        return response()->json(['data' => $users]);
    }

    public function show(User $user) {
        return response()->json(['data' => $user]);
    }

    public function store(CreateUserRequest $request) {
        $user = User::create([
            'UserID' => $request->UserID,
            'Name' => $request->Name,
            'Password' => $request->Password,
            'Status' => 2
        ]);

        return response()->json(['data' => $user]);
    }

    public function update(UpdateUserRequest $request, User $user) {
        $user->Name = $request->Name;
        $user->Password = $request->Password;
        $user->save();

        return response()->json(['data' => $user]);
    }

    public function destroy(User $user) {
        if ($user->Status == 1) {
            abort(403, 'Forbidden');
        }
        
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }


}
