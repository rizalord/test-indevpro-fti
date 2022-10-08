<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'databuku';

    protected $primaryKey = 'ID';

    public $timestamps = false;

    public $incrementing = false;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ID',
        'Title',
        'Author',
        'Publisher',
        'Category',
        'Year',
        'AllowingToLoan',
        'DaysToLoan',
        'Status',
        'Type',
        'Copy',
        'Condition',
        'TimeOfRenewal',
        'Barcode',
    ];
}
