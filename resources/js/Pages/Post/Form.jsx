import React from 'react';
export default function Form({ data, setData, errors }) {
    return (
        <>
            <div className="mb-4"><label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label><input type="text" id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />{errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}</div>
            <div className="mb-4"><label htmlFor="descreption" className="block text-sm font-medium text-gray-700">Descreption</label><textarea id="descreption" value={data.descreption} onChange={(e) => setData('descreption', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>{errors.descreption && <div className="text-red-500 text-sm mt-1">{errors.descreption}</div>}</div>
        </>
    );
}
