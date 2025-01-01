<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->date('usage_date');
            $table->date('return_date');
            $table->integer('bbm_usage')->default('0');
            $table->enum('order_status', ['Approved', 'Pending', 'Rejected']);
            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('supervisor_id');
            $table->unsignedBigInteger('driver_id')->nullable();

            $table->foreign('vehicle_id')->references('vehicle_id')->on('vehicles')->onDelete('cascade');
            $table->foreign('employee_id')->references('employee_id')->on('employees')->onDelete('cascade');
            $table->foreign('supervisor_id')->references('employee_id')->on('employees')->onDelete('cascade');
            $table->foreign('driver_id')->references('employee_id')->on('employees')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_orders');
    }
};
