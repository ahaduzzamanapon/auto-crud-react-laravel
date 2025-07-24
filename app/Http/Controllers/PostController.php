<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:posts_view')->only(['index']);
        $this->middleware('can:posts_create')->only(['create', 'store']);
        $this->middleware('can:posts_edit')->only(['edit', 'update']);
        $this->middleware('can:posts_delete')->only(['destroy']);
    }

    public function index()
    {
        $data = Post::all();
        return Inertia::render('Post/Index', ['data' => $data]);
    }

    public function create()
    {
        return Inertia::render('Post/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            // validation rules
        ]);

        Post::create($request->all());

        return redirect()->route('posts.index');
    }

    public function edit(Post $posts)
    {
        return Inertia::render('Post/Edit', ['model' => $posts]);
    }

    public function update(Request $request, Post $posts)
    {
        $request->validate([
            // validation rules
        ]);

        $posts->update($request->all());

        return redirect()->route('posts.index');
    }

    public function destroy(Post $posts)
    {
        $posts->delete();

        return redirect()->route('posts.index');
    }
}
