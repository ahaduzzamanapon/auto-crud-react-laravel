<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function users()
    {
        $users = User::with('roles', 'permissions')->get();
        $roles = Role::all();
        return Inertia::render('Admin/Users/Index', ['users' => $users, 'roles' => $roles]);
    }

    public function roles()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
        return Inertia::render('Admin/Roles/Index', ['roles' => $roles, 'permissions' => $permissions]);
    }

    public function permissions()
    {
        $permissions = Permission::all();
        return Inertia::render('Admin/Permissions/Index', ['permissions' => $permissions]);
    }

    public function assignRole(Request $request)
    {
        $user = User::findOrFail((int)$request->userId);
        $role = Role::findOrFail((int)$request->roleId);
        $user->assignRole($role);
        return back();
    }

    public function removeRole(Request $request)
    {
        $user = User::findOrFail((int)$request->userId);
        $role = Role::findOrFail((int)$request->roleId);
        $user->removeRole($role);
        return back();
    }

    public function givePermission(Request $request)
    {
        $role = Role::findOrFail((int)$request->roleId);
        $permission = Permission::findOrFail((int)$request->permissionId);
        $role->givePermissionTo($permission);
        return back();
    }

    public function revokePermission(Request $request)
    {
        $role = Role::findOrFail((int)$request->roleId);
        $permission = Permission::findOrFail((int)$request->permissionId);
        $role->revokePermissionTo($permission);
        return back();
    }
}