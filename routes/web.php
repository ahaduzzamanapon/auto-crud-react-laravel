<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/crud-builder', [App\Http\Controllers\CrudBuilderController::class, 'index'])->name('crud.builder');
    Route::post('/crud-builder', [App\Http\Controllers\CrudBuilderController::class, 'generate'])->name('crud.generate');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [App\Http\Controllers\AdminController::class, 'index'])->name('index');
        Route::get('/users', [App\Http\Controllers\AdminController::class, 'users'])->name('users');
        Route::get('/roles', [App\Http\Controllers\AdminController::class, 'roles'])->name('roles');
        Route::get('/permissions', [App\Http\Controllers\AdminController::class, 'permissions'])->name('permissions');
        Route::post('/users/assign-role', [App\Http\Controllers\AdminController::class, 'assignRole'])->name('users.assignRole');
        Route::post('/users/remove-role', [App\Http\Controllers\AdminController::class, 'removeRole'])->name('users.removeRole');
        Route::post('/roles/give-permission', [App\Http\Controllers\AdminController::class, 'givePermission'])->name('roles.givePermission');
        Route::post('/roles/revoke-permission', [App\Http\Controllers\AdminController::class, 'revokePermission'])->name('roles.revokePermission');
    });
});

require __DIR__.'/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::resource('customers', App\Http\Controllers\CustomerController::class);
});
Route::middleware(['auth'])->group(function () {
    Route::resource('posts', \App\Http\Controllers\PostController::class);
});
