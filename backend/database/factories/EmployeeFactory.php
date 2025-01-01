<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'employee_name' => $this->faker->name(),
            'employee_rank' => $this->faker->randomElement(['Employee', 'Supervisor', 'Manager', 'Driver']),
            'employee_email' => $this->faker->unique()->safeEmail(),
            'supervisor_id' => null,
        ];
    }

    public function withSupervisor(): static
    {
        return $this->state(fn(array $attributes) => [
            'supervisor_id' => Employee::factory()
        ]);
    }

    public function employee(): static
    {
        return $this->state(fn(array $attributes) => [
            'employee_rank' => 'Employee',
        ]);
    }

    public function manager(): static
    {
        return $this->state(fn(array $attributes) => [
            'employee_rank' => 'Manager',
        ]);
    }

    public function supervisor(): static
    {
        return $this->state(fn(array $attributes) => [
            'employee_rank' => 'Supervisor',
        ]);
    }
}
