<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'Title' => 'required|string|max:510',
            'Author' => 'required|string|max:200',
            'Publisher' => 'required|string|max:510',
            'Category' => 'required|string|max:510|exists:datacategory,Category',
            'Year' => 'required|integer',
            'AllowingToLoan' => 'required|string|max:20',
            'DaysToLoan' => 'required|integer',
            'Status' => 'required|string|max:100',
            'Type' => 'required|string|max:200',
            'Copy' => 'required|string|max:6',
            'Condition' => 'required|string|max:100',
            'TimeOfRenewal' => 'required|integer',
            'Barcode' => 'string|max:100|nullable',
        ];
    }
}
