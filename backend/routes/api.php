<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ServiceScheduleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Route::apiResource('users', UserController::class);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('vehicles', VehicleController::class);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('vehicle-orders', VehicleOrderController::class);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('service-schedules', ServiceScheduleController::class);
});

Route::middleware(['check.employee'])->group(function () {
    Route::apiResource('vehicles', VehicleController::class);
    Route::get('/vehicle-orders/employee/{employeeId}', [VehicleOrderController::class, 'showByEmployeeId']);
    Route::apiResource('service-schedules', ServiceScheduleController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('offices', OfficeController::class);
});
