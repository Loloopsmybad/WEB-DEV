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
        Schema::table('arbitration_cases', function (Blueprint $table) {

            if (!Schema::hasColumn('arbitration_cases','data_json')) {
                $table->json('data_json')->nullable();
            }
        
            // ❌ REMOVE THIS LINE
            // $table->string('current_step')->nullable();
        
            if (!Schema::hasColumn('arbitration_cases','review_status')) {
                $table->string('review_status')->default('draft');
            }
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
