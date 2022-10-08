<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('datauser')->insert([
            [
                'UserID' => 'admin',
                'Name' => 'admin',
                'Password' => 'adminadmin',
                'Status' => 1
            ],
            [
                'UserID' => 'user1',
                'Name' => 'user1',
                'Password' => 'user11',
                'Status' => 2
            ],
            [
                'UserID' => 'user2',
                'Name' => 'user2',
                'Password' => 'user22',
                'Status' => 2
            ],
            [
                'UserID' => 'user3',
                'Name' => 'user3',
                'Password' => 'user33',
                'Status' => 2
            ],
            [
                'UserID' => 'user4',
                'Name' => 'user4',
                'Password' => 'user44',
                'Status' => 2
            ],
            [
                'UserID' => 'user5',
                'Name' => 'user5',
                'Password' => 'user55',
                'Status' => 2
            ],
            [
                'UserID' => 'user6',
                'Name' => 'user6',
                'Password' => 'user66',
                'Status' => 2
            ],
            [
                'UserID' => 'user7',
                'Name' => 'user7',
                'Password' => 'user77',
                'Status' => 2
            ],
            [
                'UserID' => 'user8',
                'Name' => 'user8',
                'Password' => 'user88',
                'Status' => 2
            ],
            [
                'UserID' => 'user9',
                'Name' => 'user9',
                'Password' => 'user99',
                'Status' => 2
            ],
            [
                'UserID' => 'user10',
                'Name' => 'user10',
                'Password' => 'user1010',
                'Status' => 2
            ],
            [
                'UserID' => 'user11',
                'Name' => 'user11',
                'Password' => 'user1111',
                'Status' => 2
            ],
            [
                'UserID' => 'user12',
                'Name' => 'user12',
                'Password' => 'user1212',
                'Status' => 2
            ],
            [
                'UserID' => 'user13',
                'Name' => 'user13',
                'Password' => 'user1313',
                'Status' => 2
            ],
            [
                'UserID' => 'user14',
                'Name' => 'user14',
                'Password' => 'user1414',
                'Status' => 2
            ],
            [
                'UserID' => 'user15',
                'Name' => 'user15',
                'Password' => 'user1515',
                'Status' => 2
            ],
            [
                'UserID' => 'user16',
                'Name' => 'user16',
                'Password' => 'user1616',
                'Status' => 2
            ],
            [
                'UserID' => 'user17',
                'Name' => 'user17',
                'Password' => 'user1717',
                'Status' => 2
            ],
            [
                'UserID' => 'user18',
                'Name' => 'user18',
                'Password' => 'user1818',
                'Status' => 2
            ],
            [
                'UserID' => 'user19',
                'Name' => 'user19',
                'Password' => 'user1919',
                'Status' => 2
            ],
            [
                'UserID' => 'user20',
                'Name' => 'user20',
                'Password' => 'user2020',
                'Status' => 2
            ],
        ]);
    }
}
