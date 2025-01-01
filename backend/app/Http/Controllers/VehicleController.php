<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Vehicle::with('office')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_type' => 'required|in:Passenger,Freight',
            'capacity' => 'required|integer|min:1',
            'vehicle_status' => 'required|in:Owned,Rented',
            'office_id' => 'required|numeric|exists:offices,office_id',
        ]);

        $vehicle = Vehicle::create($validated);

        return response()->json([
            'message' => 'Vehicle created successfully',
            'data' => $vehicle,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vehicle = Vehicle::with('office')->find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        return response()->json([
            'message' => 'Vehicle retrieved successfully',
            'data' => $vehicle,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        $validated = $request->validate([
            'vehicle_type' => 'sometimes|in:Passenger,Freight',
            'capacity' => 'sometimes|integer|min:1',
            'vehicle_status' => 'sometimes|in:Owned,Rented',
            'office_id' => 'sometimes|numeric|exists:offices,office_id',
        ]);

        $vehicle->update($validated);

        return response()->json([
            'message' => 'Vehicle updated successfully',
            'data' => $vehicle,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        $vehicle->delete();

        return response()->json([
            'message' => 'Vehicle deleted successfully',
        ], 200);
    }
}
