<?php

namespace App\Http\Controllers;

use App\Models\ServiceSchedule;
use Illuminate\Http\Request;

class ServiceScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(ServiceSchedule::with('vehicle')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'service_date' => 'required|date',
            'service_type' => 'required|string',
            'service_status' => 'required|in:Done,On Progress',
            'vehicle_id' => 'required|exists:vehicles,vehicle_id',
        ]);

        $serviceSchedule = ServiceSchedule::create($validated);

        return response()->json($serviceSchedule, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $serviceSchedule = ServiceSchedule::with('vehicle')->find($id);

        if (!$serviceSchedule) {
            return response()->json(['message' => 'Service schedule not found'], 404);
        }

        return response()->json($serviceSchedule, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $serviceSchedule = ServiceSchedule::find($id);

        if (!$serviceSchedule) {
            return response()->json(['message' => 'Service schedule not found'], 404);
        }

        // Validate the incoming request
        $validated = $request->validate([
            'service_date' => 'sometimes|required|date',
            'service_type' => 'sometimes|required|string',
            'service_status' => 'sometimes|required|in:Done,On Progress',
            'vehicle_id' => 'sometimes|required|exists:vehicles,vehicle_id',
        ]);

        // Update the service schedule
        $serviceSchedule->update($validated);

        return response()->json($serviceSchedule, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $serviceSchedule = ServiceSchedule::find($id);

        if (!$serviceSchedule) {
            return response()->json(['message' => 'Service schedule not found'], 404);
        }

        // Delete the service schedule
        $serviceSchedule->delete();

        return response()->json(['message' => 'Service schedule deleted successfully'], 204);
    }
}
