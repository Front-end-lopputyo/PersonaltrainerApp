import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState("");
    const [training, setTraining] = React.useState({
        date: dayjs(new Date()), duration: "", activity: "", customer: customer,
    });
    const [customerList, setCustomerList] = React.useState([]);
    useEffect(()=>fetchCustomers(), []);

    const fetchCustomers = ()=> {
        fetch("https://traineeapp.azurewebsites.net/api/customers")
        .then(response => response.json())
        .then(data =>setCustomerList(data.content))
        .catch(err => console.error(err))
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDateChange = (date) => {
        setTraining({ ...training, date: date });
    }

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    const handleCustomerChange = (event) => {
        setTraining({ ...training, customer: customer })
    };

    const listTraining = () => {
        props.saveTraining(training);
        handleClose();
    }
    return (
        <div>
            <Button style={{ margin: 10, display: "flex", marginLeft: "left" }} color="success" variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">

                        <StaticDateTimePicker defaultValue={dayjs('2022-04-17T15:30')}

                            autoFocus
                            margin="dense"
                            name="date"
                            value={training.date}
                            onChange={handleDateChange}
                            label="Date"
                            fullWidth
                            variant="standard"
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        format="DD-MM-YYYY"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            id="customer"
                            value={customer}
                            // this sets customer to the link for the profile page
                            onChange={(e) => {
                                setCustomer(e.target.value);
                                handleCustomerChange(e);
                                console.log(training)}
                            }
                        >
                            {customerList.map((customer) => (
                                <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={listTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Addtraining;