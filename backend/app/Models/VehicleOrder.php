<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleOrder extends Model
{

    protected $table = 'vehicle_orders';
    protected $primaryKey = 'order_id';
    protected $fillable = ['order_date', 'usage_date', 'order_status', 'vehicle_id', 'employee_id', 'supervisor_id', 'driver_id'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'vehicle_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'employee_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(Employee::class, 'supervisor_id', 'employee_id');
    }

    public function driver()
    {
        return $this->belongsTo(Employee::class, 'driver_id', 'employee_id');
    }
}
