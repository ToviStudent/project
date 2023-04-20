import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import UseAxiosGet from '../../../hooks/UseAxiosGet';

export default function AddCategory() {
    // const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);

    const { data, loading, refetch, error } = UseAxiosGet('manager/categories/another');
    // const perUser = { identity: null, firstName: '', permission: "" };
    useEffect(() => {
        console.log('data', data);
        if (data) {
            setCategories(data)
            // const _keys = categories.keys;
            // const _values = categories.values();
            // console.log("keys" + _keys);
            // console.log("values" + _values);
        }
    }, [data])

    // const array1 = ['a', 'b', 'c'];
    // const iterator = array1.keys();

    // for (const key of iterator) {
    //   console.log(key);
    // }

    // useEffect(() => {
    //     ProductService.getProductsMini().then(data => setProducts(data));
    // }, []);


    return (
        <div className="card">
            <DataTable value={categories} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </div>
    );
}