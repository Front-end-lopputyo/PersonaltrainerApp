import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import React, { useEffect, useState } from "react"
import Addcustomer from "./Addcustomer";
import Button from '@mui/material/Button'
import Editcustomer from "./EditCustomer";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Export from "./Export";

function Customerlist() {

  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  };

  const saveCustomer = (customer) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          setMsg('Customer info saved');
          setOpen(true);
          fetchData();
        }
      })
      .catch(err => console.error(err))
  }

  const deleteCustomer = (params) => {
    if (window.confirm('Confirm delete')) {
      fetch(params.data.links[0].href, { method: "DELETE" })
        .then(response => {
          if (response.ok) {
            setMsg("Customer deleted succesfully");
            setOpen(true);
            fetchData();
          }
        })
        .catch(err => console.error(err))
    }
  }

  const editCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          setMsg("Customer information changed");
          setOpen(true);
          fetchData();
        }

      })
      .catch(err => console.error(err))
  }


  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true, flex: 1 },
    { field: "lastname", sortable: true, filter: true, flex: 1 },
    { field: "streetaddress", sortable: true, filter: true, flex: 1 },
    { field: "postcode", sortable: true, filter: true, flex: 1 },
    { field: "city", sortable: true, filter: true, flex: 1 },
    { field: "email", sortable: true, filter: true, flex: 1 },
    { field: "phone", sortable: true, filter: true, flex: 1 },
    {
      headerName: "Delete", cellRenderer: params =>
        <Button startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteCustomer(params)}>
          Delete</Button>,
      width: 120
    },
    { cellRenderer: row => <Editcustomer editCustomer={editCustomer} customer={row.data} /> }

  ])


  return (
    <div className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "3%" }}>
      <div>
        <Addcustomer saveCustomer={saveCustomer} />
      </div>

      <AgGridReact
        pagination={true}
        paginationPageSize={10}
        rowData={customers}
        columnDefs={columnDefs}>
      </AgGridReact>
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </div>
  )
}

export default Customerlist;

