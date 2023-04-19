import { AgGridReact } from "ag-grid-react";
import React ,{ useEffect, useState } from "react"


function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(()=>fetchData(), []); 

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const [columnDefs] = useState([
        {field: "firstname", sortable: true, filter: true, flex: 1},
        {field: "lastname", sortable: true, filter: true, flex:1},
        {field: "streetaddress", sortable: true, filter: true, flex:1},
        {field: "postcode", sortable: true, filter: true,flex:1},
        {field: "city", sortable: true, filter: true,flex:1},
        {field: "email", sortable: true, filter: true,flex:1},
        {field: "phone", sortable: true, filter: true,flex:1}])



    return (
        <div className="ag-theme-material"
        style={{height: 600, width:"90%", margin: "auto"}}>
            <AgGridReact
                rowData = {customers}
                columnDefs = {columnDefs}>
            </AgGridReact>
        </div>
    )
}

export default Customerlist;

