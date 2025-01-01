<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Employee::with(['supervisor', 'subordinates'])->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'employee_rank' => 'required|in:Employee,Supervisor,Manager,Driver',
            'employee_email' => 'required|string|email|max:255|unique:employees,employee_email',
            'supervisor_id' => 'nullable|exists:employees,employee_id',
        ]);

        $employee = Employee::create($validated);

        return response()->json($employee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $employee = Employee::with(['supervisor', 'subordinates'])->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        return response()->json($employee, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validated = $request->validate([
            'employee_name' => 'sometimes|string|max:255',
            'employee_rank' => 'sometimes|in:Employee,Supervisor,Manager,Driver',
            'employee_email' => 'sometimes|string|email|max:255|unique:employees,employee_email,' . $id . ',employee_id',
            'supervisor_id' => 'nullable|exists:employees,employee_id',
        ]);

        $employee->update($validated);

        return response()->json($employee, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 204);
    }
}
