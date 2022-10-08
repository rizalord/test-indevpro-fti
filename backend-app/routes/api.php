<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Users route
Route::prefix('users')->middleware(['jwtauth', 'isadmin'])->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user:UserID}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{user:UserID}', [UserController::class, 'update']);
    Route::delete('/{user:UserID}', [UserController::class, 'destroy']);
});

// Categories route
Route::get('/categories', [CategoryController::class, 'index'])->middleware(['jwtauth']);

// Books route
Route::prefix('books')->middleware('jwtauth')->group(function () {
    Route::get('/', [BookController::class, 'index']);
    Route::get('/{book:ID}', [BookController::class, 'show']);
    Route::post('/', [BookController::class, 'store'])->middleware('isadmin');
    Route::put('/{book:ID}', [BookController::class, 'update'])->middleware('isadmin');
    Route::delete('/{book:ID}', [BookController::class, 'destroy'])->middleware('isadmin');
});

// Auth
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('jwtauth');
});
