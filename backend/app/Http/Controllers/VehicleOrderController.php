<?php

namespace App\Http\Controllers;

use App\Models\VehicleOrder;
use Illuminate\Http\Request;

class VehicleOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(VehicleOrder::with(['vehicle', 'employee', 'supervisor', 'driver'])->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_date' => 'required|date',
            'usage_date' => 'required|date',
            'order_status' => 'required|in:Approve,Pending,Cancelled',
            'vehicle_id' => 'required|exists:vehicles,vehicle_id',
            'employee_id' => 'required|exists:employees,employee_id',
            'supervisor_id' => 'required|exists:employees,employee_id',
            'driver_id' => 'nullable|exists:employees,employee_id',
        ]);

        $vehicleOrder = VehicleOrder::create($validated);

        return response()->json($vehicleOrder, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $vehicleOrder = VehicleOrder::with(['vehicle', 'employee', 'supervisor', 'driver'])->find($id);

        if (!$vehicleOrder) {
            return response()->json(['message' => 'Vehicle order not found'], 404);
        }

        return response()->json($vehicleOrder, 200);
    }

    public function showByEmployeeId($employeeId)
    {
        $vehicleOrder = VehicleOrder::with(['vehicle', 'employee', 'supervisor', 'driver'])->where('employee_id', $employeeId)->first();
        if (!$vehicleOrder) {
            return response()->json(['message' => 'Vehicle order not found'], 404);
        }
        return response()->json($vehicleOrder, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $vehicleOrder = VehicleOrder::find($id);

        if (!$vehicleOrder) {
            return response()->json(['message' => 'Vehicle order not found'], 404);
        }

        $validated = $request->validate([
            'order_date' => 'sometimes|date',
            'usage_date' => 'sometimes|date',
            'order_status' => 'sometimes|in:Approve,Pending,Cancelled',
            'vehicle_id' => 'sometimes|exists:vehicles,vehicle_id',
            'employee_id' => 'sometimes|exists:employees,employee_id',
            'supervisor_id' => 'sometimes|exists:employees,employee_id',
            'driver_id' => 'nullable|exists:employees,employee_id',
        ]);

        $vehicleOrder->update($validated);

        return response()->json($vehicleOrder, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $vehicleOrder = VehicleOrder::find($id);

        if (!$vehicleOrder) {
            return response()->json(['message' => 'Vehicle order not found'], 404);
        }

        $vehicleOrder->delete();

        return response()->json(['message' => 'Vehicle order deleted successfully'], 204);
    }
}
