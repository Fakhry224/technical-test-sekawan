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
        Schema::create('mines', function (Blueprint $table) {
            $table->id('mine_id');
            $table->string('mine_name');
            $table->integer('capacity');
            $table->enum('status', ['Active', 'Non-Active']);
            $table->unsignedBigInteger('region_id')->nullable();
            $table->foreign('region_id')->references('region_id')->on('regions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mines');
    }
};
