import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        // form fields
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('customer.store'));
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Create Customer</h1>
            <hr className="my-4" />
            <form onSubmit={handleSubmit}>
                <Form data={data} setData={setData} errors={errors} />
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={processing}>
                        Create
                    </button>
                    <Link href={route('customer.index')} className="ml-4 text-gray-600">Cancel</Link>
                </div>
            </form>
        </>
    );
}
