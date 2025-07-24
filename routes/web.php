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
        Route::get('/users/create', [App\Http\Controllers\AdminController::class, 'createUser'])->name('users.create');
        Route::post('/users', [App\Http\Controllers\AdminController::class, 'storeUser'])->name('users.store');
        Route::get('/users/{user}/edit', [App\Http\Controllers\AdminController::class, 'editUser'])->name('users.edit');
        Route::put('/users/{user}', [App\Http\Controllers\AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [App\Http\Controllers\AdminController::class, 'destroyUser'])->name('users.destroy');
        Route::post('/roles/give-permission', [App\Http\Controllers\AdminController::class, 'givePermission'])->name('roles.givePermission');
        Route::post('/roles/revoke-permission', [App\Http\Controllers\AdminController::class, 'revokePermission'])->name('roles.revokePermission');
        Route::post('/roles/sync-permissions', [App\Http\Controllers\AdminController::class, 'syncPermissions'])->name('roles.syncPermissions');
        Route::get('/roles/create', [App\Http\Controllers\AdminController::class, 'createRole'])->name('roles.create');
        Route::post('/roles', [App\Http\Controllers\AdminController::class, 'storeRole'])->name('roles.store');
        Route::get('/roles/{role}/edit', [App\Http\Controllers\AdminController::class, 'editRole'])->name('roles.edit');
        Route::put('/roles/{role}', [App\Http\Controllers\AdminController::class, 'updateRole'])->name('roles.update');
        Route::delete('/roles/{role}', [App\Http\Controllers\AdminController::class, 'destroyRole'])->name('roles.destroy');

        Route::get('/settings', [App\Http\Controllers\SettingController::class, 'index'])->name('settings.index');
        Route::put('/settings', [App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
    });
});

require __DIR__.'/auth.php';



