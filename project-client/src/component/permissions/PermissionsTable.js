import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { CustomerService } from './service';
import UseAxiosGet from '../../hooks/UseAxiosGet';

export default function PermissionsTable() {
  const [permissions_processes] = useState(['edit', 'view', 'non']);
  
  const{data,loading,refetch,error}=UseAxiosGet('permissions_processes/');
  useEffect(()=>{console.log('data',data);},[data])

  // useEffect(() => {
  //   CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  // }, []);

  const headerTemplate = (data) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="font-bold">{data!==undefined&&data}</span>
        {/* .permission.permissionName */}
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={permissions_processes}
        rowGroupMode="subheader"
        groupRowsBy="permissionName"
        sortMode="single"
        sortField="permissionName"
        sortOrder={1}
        scrollable
        scrollHeight="400px"
        rowGroupHeaderTemplate={headerTemplate}
        tableStyle={{ minWidth: '20rem' }}
      >
        <Column field="id" header="Permission name"></Column>
        <Column field="processDescription" header="Process description"></Column>
      </DataTable>
    </div>
  );
}
