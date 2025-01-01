<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{

    protected $table = 'vehicles';
    protected $primaryKey = 'vehicle_id';
    protected $fillable = [
        'vehicle_type',
        'capacity',
        'vehicle_status',
        'office_id'
    ];

    public function office()
    {
        return $this->belongsTo(Office::class, 'office_id', 'office_id');
    }
}
