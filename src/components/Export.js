import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function Export() {
  const handleClick = async () => {

    const confirmed = window.confirm('Download data as CSV-file?');
    if (!confirmed) {
      return;
    }
    const response = await axios.get('https://traineeapp.azurewebsites.net/api/customers');
    const customers = response.data.content;

    const filteredcustomers = customers.map(customer => ({
      firstname: customer.firstname,
      lastname: customer.lastname,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city,
      email: customer.email,
      phone: customer.phone
    }));

    const csvData = filteredcustomers.map(customer => `${customer.firstname},${customer.lastname},${customer.streetaddress},${customer.postcode},${customer.city},${customer.email},${customer.phone}`).join('\n');

    const blob = new Blob([csvData],{type:'text/csv'});

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customers.csv';

    link.click();
  };

  return (
    <div>  
    <Button style={{ margin: 10, display: "center", marginLeft: "left"}} onClick={handleClick} size="large" color="success" variant="contained">Download</Button>
   
    </div>
  );
}
export default Export;