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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id('vehicle_id');
            $table->enum('vehicle_type', ['Passenger', 'Freight']);
            $table->integer('capacity');
            $table->enum('vehicle_status', ['Owned', 'Rented']);
            $table->unsignedBigInteger('office_id');
            $table->foreign('office_id')->references('office_id')->on('offices')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
