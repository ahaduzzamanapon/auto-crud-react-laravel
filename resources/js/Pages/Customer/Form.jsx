import React from 'react';

export default function Form({ data, setData, errors }) {
    return (
        <>
            <div className="mb-4"><label htmlFor="ert" className="block text-sm font-medium text-gray-700">Ert</label><input type="text" id="ert" value={data.ert} onChange={(e) => setData('ert', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />{errors.ert && <div className="text-red-500 text-sm mt-1">{errors.ert}</div>}</div>
        </>
    );
}
