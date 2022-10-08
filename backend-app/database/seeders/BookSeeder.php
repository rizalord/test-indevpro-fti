<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('databuku')->insert([
            [
                'ID' => "200.1 MAR.BET",
                'Title' => 'THE KINGDOM OF THE KING',
                'Author' => 'WALTER R. MARTIN',
                'Publisher' => 'BETHANY FELLOWSHIP, INC., PUBLISHERS',
                'Category' => 'RELIGION',
                'Year' => 1977,
                'AllowingToLoan' => 'Y',
                'DaysToLoan' => 7,
                'Status' => 'ADA',
                'Type' => "BUKU BAHASA INGGRIS",
                'Copy' => null,
                'Condition' => 'BAIK',
                'TimeOfRenewal' => 1,
                'Barcode' => null
            ],
            [
                'ID' => "200. KIL.MAR",
                'Title' => 'CHILDREN IN CRISIS',
                'Author' => 'PHYLLIS KILBOURN',
                'Publisher' => 'MARC',
                'Category' => 'RELIGION',
                'Year' => 1995,
                'AllowingToLoan' => 'Y',
                'DaysToLoan' => 4,
                'Status' => 'ADA',
                'Type' => "BE",
                'Copy' => null,
                'Condition' => 'BAIK',
                'TimeOfRenewal' => 1,
                'Barcode' => '-'
            ],
            [
                'ID' => "266.2 1",
                'Title' => 'JUDUL Vol.2',
                'Author' => 'ADELLE DAVIS',
                'Publisher' => 'AUSTRALIAN BROADCASTING COMMISSION',
                'Category' => 'RELIGION',
                'Year' => 2008,
                'AllowingToLoan' => 'Y',
                'DaysToLoan' => 7,
                'Status' => 'KELUAR',
                'Type' => "BE",
                'Copy' => 1,
                'Condition' => 'BAIK',
                'TimeOfRenewal' => 1,
                'Barcode' => null
            ],

        ]);
    }
}
