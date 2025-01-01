<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSchedule extends Model
{
    //
    protected $table = 'service_schedules';
    protected $primaryKey = 'service_id';
    protected $fillable = ['service_date', 'service_type', 'service_status', 'vehicle_id'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'vehicle_id');
    }
}
