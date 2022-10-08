<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request) {
        $books = Book::query()
            ->where('Title', 'like', "%{$request->input('title')}%")
            ->orderBy('Title')
            ->paginate(10);
            
        return response()->json(['data' => $books]);
    }

    public function show(Book $book) {
        return response()->json(['data' => $book]);
    }

    public function store(StoreBookRequest $request) {
        $book = Book::create($request->validated());

        return response()->json(['data' => $book]);
    }

    public function update(UpdateBookRequest $request, Book $book) {
        $book->update($request->validated());

        return response()->json(['data' => $book]);
    }

    public function destroy(Book $book) {
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }
}
