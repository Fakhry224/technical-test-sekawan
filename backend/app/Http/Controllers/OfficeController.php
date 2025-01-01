<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Office::with('region')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'office_name' => 'required|string|max:255',
            'office_type' => 'required|in:Headquarters,Branch',
            'address' => 'nullable|string|max:255',
            'region_id' => 'nullable|exists:regions,region_id',
        ]);

        $office = Office::create($validated);

        return response()->json($office, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $office = Office::with('region')->find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        return response()->json($office, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $office = Office::find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        $validated = $request->validate([
            'office_name' => 'sometimes|string|max:255',
            'office_type' => 'sometimes|in:Headquarters,Branch',
            'address' => 'nullable|string|max:255',
            'region_id' => 'nullable|exists:regions,region_id',
        ]);

        $office->update($validated);

        return response()->json($office, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $office = Office::find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        $office->delete();

        return response()->json(['message' => 'Office deleted successfully'], 204);
    }
}
