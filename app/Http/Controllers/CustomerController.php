<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $data = Customer::all();
        return Inertia::render('Customer/Index', ['data' => $data]);
    }

    public function create()
    {
        return Inertia::render('Customer/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            // validation rules
        ]);

        Customer::create($request->all());

        return redirect()->route('customer.index');
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', ['model' => $customer]);
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            // validation rules
        ]);

        $customer->update($request->all());

        return redirect()->route('customer.index');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customer.index');
    }
}
