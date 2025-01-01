<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $approver2 = Employee::factory()->manager()->create([
            'employee_name' => 'Manager Approver',
        ]);

        $userApprover2 = User::factory()->approver()->create([
            'name' => 'Approver 2 User',
            'email' => 'approver2@example.com',
            'employee_id' => $approver2->employee_id,
        ]);

        // Approver 1: Supervisor with supervisor_id pointing to Approver 2
        $approver1 = Employee::factory()->supervisor()->create([
            'employee_name' => 'Supervisor Approver',
            'supervisor_id' => $approver2->employee_id, // Linked to Approver 2
        ]);

        $userApprover1 = User::factory()->approver()->create([
            'name' => 'Approver 1 User',
            'email' => 'approver1@example.com',
            'employee_id' => $approver1->employee_id,
        ]);

        // Admin: Employee with supervisor_id pointing to Approver 1
        $admin = Employee::factory()->employee()->create([
            'employee_name' => 'Employee Admin',
            'supervisor_id' => $approver1->employee_id, // Linked to Approver 1
        ]);

        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'employee_id' => $admin->employee_id,
        ]);
    }
}
