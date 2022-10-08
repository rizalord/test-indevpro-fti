<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('databuku', function (Blueprint $table) {
            $table->string('ID', 100)->primary();
            $table->string('Title', 510);
            $table->string('Author', 200);
            $table->string('Publisher', 510);
            $table->string('Category', 510);
            $table->integer('Year');
            $table->string('AllowingToLoan', 20);
            $table->smallInteger('DaysToLoan');
            $table->string('Status', 100);
            $table->string('Type', 200);
            $table->string('Copy', 6)->nullable();
            $table->string('Condition', 100);
            $table->smallInteger('TimeOfRenewal');
            $table->string('Barcode', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('databuku');
    }
};
