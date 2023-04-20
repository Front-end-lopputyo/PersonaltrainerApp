import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
        email: "", phone: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    const listCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }
        return (
            <div>
                <Button style={{ margin: 10, display: "flex", marginLeft: "left" }}  color="success" variant="outlined" onClick={handleClickOpen}>
                    Add Customer
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New customer</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            onChange={e => handleInputChange(e)}
                            label="firstname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange={e => handleInputChange(e)}
                            label="lastname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange={e => handleInputChange(e)}
                            label="streetaddress"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange={e => handleInputChange(e)}
                            label="postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange={e => handleInputChange(e)}
                            label="city"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange={e => handleInputChange(e)}
                            label="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange={e => handleInputChange(e)}
                            label="phone"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={listCustomer}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

export default Addcustomer;