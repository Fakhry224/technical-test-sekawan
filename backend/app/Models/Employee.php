<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'employees';
    protected $primaryKey = 'employee_id';
    protected $fillable = [
        'employee_name',
        'employee_rank',
        'employee_email',
        'supervisor_id'
    ];

    // Relasi ke Supervisor
    public function supervisor()
    {
        return $this->belongsTo(Employee::class, 'supervisor_id', 'employee_id');
    }

    // Relasi ke Subordinates
    public function subordinates()
    {
        return $this->hasMany(Employee::class, 'supervisor_id', 'employee_id');
    }

    // Relasi ke Office
    public function office()
    {
        return $this->belongsTo(Office::class, 'office_id', 'office_id');
    }
}
