<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $table = 'offices';
    protected $primaryKey = 'office_id';
    protected $fillable = [
        'office_name',
        'office_type',
        'address',
        'region_id'
    ];

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'region_id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'office_id', 'office_id');
    }
}
