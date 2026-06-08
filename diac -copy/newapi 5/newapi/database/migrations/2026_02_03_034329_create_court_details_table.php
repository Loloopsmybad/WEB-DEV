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
        Schema::create('court_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('arbitration_case_id')->constrained()->cascadeOnDelete();
    $table->string('court_name');
    $table->string('judge_name')->nullable();
    $table->date('order_date')->nullable();
    $table->string('filing_type');
    $table->string('petition_number');
    $table->string('year');
    $table->string('case_title');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_details');
    }
};
