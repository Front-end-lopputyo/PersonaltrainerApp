import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
        email: "", phone: "",
    });

    const handleClickOpen = () => {
        console.log(props.customer)
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress:props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    const editCustomer = () => {
        props.editCustomer(customer, props.customer.links[0].href);
        handleClose();
    }
        return (
            <div>
                <Button startIcon={<EditIcon/>}  onClick={handleClickOpen}>
                    Edit
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
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange={e => handleInputChange(e)}
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange={e => handleInputChange(e)}
                            label="Street address"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange={e => handleInputChange(e)}
                            label="Postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange={e => handleInputChange(e)}
                            label="City"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange={e => handleInputChange(e)}
                            label="Email address"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange={e => handleInputChange(e)}
                            label="Phone number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={editCustomer}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

export default EditCustomer;