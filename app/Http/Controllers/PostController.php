<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:post_view')->only(['index']);
        $this->middleware('can:post_create')->only(['create', 'store']);
        $this->middleware('can:post_edit')->only(['edit', 'update']);
        $this->middleware('can:post_delete')->only(['destroy']);
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

        return redirect()->route('post.index');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', ['model' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            // validation rules
        ]);

        $post->update($request->all());

        return redirect()->route('post.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('post.index');
    }
}
