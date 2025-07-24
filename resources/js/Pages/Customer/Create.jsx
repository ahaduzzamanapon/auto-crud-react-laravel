import React from 'react';
import { Link, useForm,Head } from '@inertiajs/react';
import Form from './Form';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        // form fields
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('customers.store'));
    }

    return (
        <>
          <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Customer</h2>}
        >
            <h1 className="text-2xl font-bold">Create Customer</h1>
            <hr className="my-4" />
            <form onSubmit={handleSubmit}>
                <Form data={data} setData={setData} errors={errors} />
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={processing}>
                        Create
                    </button>
                    <Link href={route('customers.index')} className="ml-4 text-gray-600">Cancel</Link>
                </div>
            </form>
            </AuthenticatedLayout>
        </>
    );
}
