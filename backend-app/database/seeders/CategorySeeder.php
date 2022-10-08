<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('datacategory')->insert([
            [
                'CategoryID' => '200',
                'Category' => 'RELIGION'
            ],
            [
                'CategoryID' => '200.1',
                'Category' => 'PHILOSOPHY AND THEORY'
            ],
            [
                'CategoryID' => '200.2',
                'Category' => 'DOCTRINE'
            ],
            [
                'CategoryID' => '200.3',
                'Category' => 'HISTORICAL AND PERSONAL NARRATIVES'
            ],
            [
                'CategoryID' => '200.4',
                'Category' => 'ORGANIZATIONS AND MISSIONS'
            ],
            [
                'CategoryID' => '200.5',
                'Category' => 'RELIGIOUS EXPERIENCE, EXPERIENCE IN GOD'
            ],
            [
                'CategoryID' => '200.6',
                'Category' => 'MYSTICISM'
            ],
            [
                'CategoryID' => '200.7',
                'Category' => 'DEVOTIONAL'
            ],
            [
                'CategoryID' => '200.8',
                'Category' => 'PRAYER'
            ],
            [
                'CategoryID' => '200.9',
                'Category' => 'HOLY DAYS AND SPECIAL OCCASIONS'
            ],
            [
                'CategoryID' => '200.91',
                'Category' => 'CHRISTMAS'
            ],
            [
                'CategoryID' => '200.92',
                'Category' => 'EASTER'
            ],
            [
                'CategoryID' => '200.93',
                'Category' => 'ADVENT'
            ],
            [
                'CategoryID' => '200.94',
                'Category' => 'LENT'
            ],
            [
                'CategoryID' => '200.95',
                'Category' => 'HOLY WEEK'
            ],
            [
                'CategoryID' => '200.96',
                'Category' => 'HOLY DAYS AND SPECIAL OCCASIONS'
            ],
            [
                'CategoryID' => '200.97',
                'Category' => 'HOLY DAYS AND SPECIAL OCCASIONS'
            ],
            [
                'CategoryID' => '200.98',
                'Category' => 'HOLY DAYS AND SPECIAL OCCASIONS'
            ],
            [
                'CategoryID' => '200.99',
                'Category' => 'HOLY DAYS AND SPECIAL OCCASIONS'
            ],
            [
                'CategoryID' => '201',
                'Category' => 'BIBLIOGRAPHY'
            ],
        ]);
    }
}
