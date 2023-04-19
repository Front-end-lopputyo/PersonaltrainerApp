import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import React ,{ useEffect, useState } from "react"
import Addcustomer from "./Addcustomer";

function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(()=>fetchData(), []); 

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    };

    const saveCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers',{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
      }

      const deleteCustomer = (params) => {
        if (window.confirm("click confirm delete")){
            fetch(params,{method: "DELETE"})
      .then(res => fetchData())
      .catch(err => console.error(err))
        }
      };

    const [columnDefs] = useState([
        {field: "firstname", sortable: true, filter: true, flex: 1},
        {field: "lastname", sortable: true, filter: true, flex:1},
        {field: "streetaddress", sortable: true, filter: true, flex:1},
        {field: "postcode", sortable: true, filter: true,flex:1},
        {field: "city", sortable: true, filter: true,flex:1},
        {field: "email", sortable: true, filter: true,flex:1},
        {field: "phone", sortable: true, filter: true,flex:1},
       
    ])

        

    return (
        <div className="ag-theme-material"
        style={{height: 600, width:"90%", margin: "auto"}}>
            <Addcustomer saveCustomer={saveCustomer}/>
            <AgGridReact
                rowData = {customers}
                columnDefs = {columnDefs}>
            </AgGridReact>
        </div>
    )
}

export default Customerlist;

