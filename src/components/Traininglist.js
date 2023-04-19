import { AgGridReact } from "ag-grid-react";
import React, {useState, useEffect} from "react";
// coded by Atte Mäkinen
function Traininglist() {
    const [trainings, setTrainings] =useState ([]);

    useEffect(()=>fetchData(), []);

    const fetchData = ()=> {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data =>setTrainings(data))
        .catch(err => console.error(err))
      };

      const [columnDefs] = useState([
        {field: "date", sortable: true, filter: true, flex: 1, cellRenderer: ({ value }) => {
          const date = new Date(value);
          const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          return formattedDate;
        }},
        {field: "duration", sortable: true, filter: true, flex:1},
        {field: "activity", sortable: true, filter: true, flex:1},
        {field: "customer.firstname",headerName: "Firstname", sortable: true, filter: true, flex:1}
    ])


    return (
        <div className="ag-theme-material"
      style={{height: 600, width:"90%", margin: "auto"}}>
        <AgGridReact
            rowData= {trainings}
            columnDefs = {columnDefs}>
        </AgGridReact>
      </div>
    )
}
export default Traininglist;