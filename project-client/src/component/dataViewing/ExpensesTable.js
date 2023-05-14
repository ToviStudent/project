import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import UserContext from '../user/UserContext';
import axios from 'axios';


export default function ExpensesTable() {
    const { user } = useContext(UserContext);
    const {state} = useLocation();
    const [expenses, setExpenses] = useState();
    const [date, setDate] = useState();

    useEffect(()=>{if(state){setDate(new Date(state.params.year,state.params.month-1));setExpenses(state.data);console.log({state});}},[state])

    useEffect(() => {
        console.log("===", { user });
        if (user.familyId&&date) {
          axios
            .get(`http://localhost:8000/expenses/expense_category/${user?.familyId}`, {
              params: { month: date.getMonth() + 1, year: date.getFullYear() ,categoryName: state.params.categoryName},
            })
            .then((data) => {
              console.log({ data });
              setExpenses(data.data);
            });
        }
      }, [date, user.familyId]);

    return (
        <div className="card">
            <Card className="md:w-25rem">
                <h2>expenses</h2>
                <div className="card flex justify-content-center">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            view="month"
            dateFormat="mm/yy"
          />
        </div>
            <DataTable value={expenses} tableStyle={{ minWidth: '20rem' }}>
                <Column field="productName" header="productName"></Column>
                <Column field="price" header="price"></Column>
                <Column field="generalDescription" header="generalDescription"></Column>
            </DataTable>
        </Card></div>
    );
}