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
        Schema::create('datauser', function (Blueprint $table) {
            $table->string('UserID', 100)->primary();
            $table->string('Name', 60);
            $table->string('Password', 20);
            $table->tinyInteger('Status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datauser');
    }
};
