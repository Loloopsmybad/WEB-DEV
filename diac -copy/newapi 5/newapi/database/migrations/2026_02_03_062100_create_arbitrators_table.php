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
        Schema::create('arbitrators', function (Blueprint $table) {
    $table->id();
    $table->foreignId('arbitration_case_id')->constrained()->cascadeOnDelete();
    $table->boolean('appointed_by_court');
    $table->string('name')->nullable();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arbitrators');
    }
};
