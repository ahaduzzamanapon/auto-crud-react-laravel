import React from 'react';
export default function Form({ data, setData, errors }) {
    return (
        <>
            <div className="mb-4"><label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label><input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />{errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}</div>
            <div className="mb-4"><label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label><input type="number" id="amount" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />{errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}</div>
            <div className="mb-4"><label htmlFor="descreption" className="block text-sm font-medium text-gray-700">Descreption</label><textarea id="descreption" value={data.descreption} onChange={(e) => setData('descreption', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>{errors.descreption && <div className="text-red-500 text-sm mt-1">{errors.descreption}</div>}</div>
        </>
    );
}
