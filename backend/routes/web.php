<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

require __DIR__ . '/auth.php';
