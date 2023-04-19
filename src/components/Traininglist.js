import { AgGridReact } from "ag-grid-react";
import React, {useState, useEffect} from "react";
// coded by Atte Mäkinen
function Traininglist() {
    const [trainings, setTrainings] =useState ([]);

    useEffect(()=>fetchData(), []);

    const fetchData = ()=> {
        fetch("https://traineeapp.azurewebsites.net/api/trainings")
        .then(response => response.json())
        .then(data =>setTrainings(data.content))
        .catch(err => console.error(err))
      };

      const [columnDefs] = useState([
        {field: "date", sortable: true, filter: true, flex: 1},
        {field: "duration", sortable: true, filter: true, flex:1},
        {field: "activity", sortable: true, filter: true, flex:1},
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