import { AgGridReact } from "ag-grid-react";
import React, {useState, useEffect} from "react";
import Addtraining from "./Addtraining";
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';




function Traininglist() {
    const [trainings, setTrainings] =useState ([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState([]);


    useEffect(()=>fetchData(), []);

    // fetches api from "gettrainings" endpoint
    const fetchData = ()=> {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data =>setTrainings(data))
        .catch(err => console.error(err))
      };
        // save new training and link training to customer
      const saveTraining = (training) => {
        fetch ("https://traineeapp.azurewebsites.net/api/trainings",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            date: dayjs(training.date).toISOString(),
            activity: training.activity,
            duration: training.duration,
            customer: training.customer,
          })
        })
        .then(response => {
          if(response.ok){
          setMsg('Training added for customer' );
          setOpen(true);
          fetchData();
      }
      })
      .catch(err => console.error(err))
  }

  const deleteTraining =(params) => {
    if (window.confirm("confirm delete")) {
      fetch('https://traineeapp.azurewebsites.net/api/trainings/' + params,
      {method: "DELETE"})
      
      .then(response => {
        if (response.ok) {
          setMsg("Training deleted succesfully");
          setOpen(true);
          fetchData();
        }
      })
      .catch(err => console.error(err))
  }
}
   

  
        // renders data inside ag grid
      const [columnDefs] = useState([
        {field: "date", sortable: true, filter: true, flex: 1, cellRenderer: ({ value }) => {
          const date = new Date(value);
          const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          return formattedDate;
        }},
        {field: "duration", sortable: true, filter: true, flex:1},
        {field: "activity", sortable: true, filter: true, flex:1},
        {field: "customer.firstname",headerName: "Firstname", sortable: true, filter: true, flex:1},
        {  
          cellRenderer: params => 
          <Button size="small" color="error" startIcon={<DeleteIcon/>} onClick={() => deleteTraining(params.data.id)}>
              Delete</Button>,},
        
        
    ])


    return (
        <div className="ag-theme-material"
      style={{height: 600, width:"90%", margin: "100px"}}>
        <Addtraining saveTraining={saveTraining} />
        <AgGridReact
            rowData= {trainings}
            columnDefs = {columnDefs}>
        </AgGridReact>
        <Snackbar
         open={open}
         autoHideDuration={3500}
         onClose={() => setOpen(false)}
         message = {msg}
         />
      </div>
    )
}
export default Traininglist;