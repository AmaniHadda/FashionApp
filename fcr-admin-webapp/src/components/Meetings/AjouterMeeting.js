import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function AjouterMeeting({ open, handleClose, getMeetings }) {
    const theme = useTheme();
    const [users, setUsers] = useState([])
    const [coach, setCoach] = useState([])
    const [habillements, setHabillements] = useState([])
    const [hb, setHb] = useState([])
    const [hb2, setHb2] = useState([])
    const [user, setUser] = useState("")
    const [coachmail, setCoachMail] = useState("")
    const [dateMeet, setDatMeet] = useState("")
    const [type, setType] = useState("")
    const [coarcherr, setCoachErr] = useState("")
    const [typeerr, setTypeErr] = useState("")
    const [usererr, setUserErr] = useState("")
    const [dateMeetErr, setDatMeetErr] = useState("")

    const getUsers = async () => {
        await axios.get(" /user/users").then(res => setUsers(res.data)).catch(err => console.log(err))
    }
    const getCoaches = async () => {
        await axios.get(" /coach/getall/false").then(res => setCoach(res.data)).catch(err => console.log(err))
    }   
    const getHabillements = async () => {
        await axios.get(" /habillements/retrieve/enable").then(res => setHabillements(res.data.data)).catch(err => console.log(err))
    }
    const handleChange = (event) => {
        if(event.target.value){setUserErr("")}
        setUser(event.target.value);
    };
    const handleChangeCoach = (event) => {
        if(event.target.value){setCoachErr("")}
        setCoachMail(event.target.value);
    };
    const handleChangeDateMeet = (event) => {        
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if(event.target.value==="")
        {setDatMeetErr("Ce champs est requis")}
        else if(event.target.value<today){
            setDatMeetErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        else{
            setDatMeet(event.target.value);
            setDatMeetErr("")
        }
    };
    const handleChangeType = (event) => {
        if(event.target.value){setTypeErr("")}
        setType(event.target.value);
    };
    const handleChangeHB = (event) => {   
        const {
            target: { value },
        } = event;
        setHb(
            typeof value === 'string' ? value.split(',') : value,
        );
        setHb2(
            typeof value === 'string' ? value.split(',').map((item) => (getNameById(item))) : value.map((item) => (getNameById(item))),
        );
        console.log(hb2)
    };
    const getNameById = (name) => {
        const habillement = habillements.find((item) => item.name === name);
        return habillement ? habillement._id : '';
    };
    const addMeeting = async () => {
        if (!coachmail || !type || !user || !dateMeet) {
            setCoachErr(coachmail ? "" : "Ce champs est requis")
            setTypeErr(type ? "" : "Ce champs est requis")
            setUserErr(user ? "" : "Ce champs est requis")
            setDatMeetErr(dateMeet ? "" : "Ce champs est requis")
            return;    
        }
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if(dateMeet<today){
            return setDatMeetErr("La date doit étre supérieure à date d'aujourd'hui")
        }
        await axios
            .post("/api/meetings/add", {
                date: dateMeet,
                eventType: type,
                coachEmail: coachmail,
                userEmail: user,
                habillements: hb2
            })
            .then((res) => { getMeetings(); handleClose(); toast.success("Rendez-vous ajouté") })
            .catch(err => console.log(err));
        console.log(user)
        console.log(coachmail)
    };
    useEffect(() => {
        getUsers();
        getCoaches();
        getHabillements();
    }, [])


    return (
        <>
            <ToastContainer />
            <Dialog
                open={Boolean(open)}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle style={{ color: "#ec407a", fontSize: "22px" }}>
                    Ajouter un rendez-vous
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div style={{ marginTop: "15px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Email du Coach</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={coachmail}
                                    label="Nom du Coach"
                                    onChange={handleChangeCoach}
                                    error={Boolean(coarcherr)}
                                    //onFocus={(e)=>!e.target.value?setCoachErr("amani"): setCoachErr("")}
                                >
                                    {coach.map((e, index) => <MenuItem key={index} value={e.email}>{e.email}</MenuItem>)}
                                </Select>
                                <FormHelperText style={{color:"#8f170ace"}}>{coarcherr}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Email de l'Utilisateur</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={user}
                                    label="Email de l'Utilisateur"
                                    onChange={handleChange}
                                    error={Boolean(usererr)}
                                >
                                    {users.map((e, index) => <MenuItem key={index} value={e.email}>{e.email}</MenuItem>)}
                                </Select>
                                <FormHelperText style={{color:"#8f170ace"}}>{usererr}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type d'événement</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type d'événement"
                                    onChange={handleChangeType}
                                    error={Boolean(typeerr)}
                                >
                                    <MenuItem value="Soirée">Soirée</MenuItem>
                                    <MenuItem value="Quotidien">Quotidien</MenuItem>
                                    <MenuItem value="Travail">Travail</MenuItem>
                                </Select>
                                <FormHelperText style={{color:"#8f170ace"}}>{typeerr}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Habillements</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={hb}
                                    onChange={handleChangeHB}
                                    input={<OutlinedInput id="select-multiple-chip" label="Habillements" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {habillements.map((name) => (
                                        <MenuItem
                                            key={name._id}
                                            value={name.name}
                                            style={getStyles(name.name, hb, theme)}
                                        >
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: "15px", marginLeft: '-10px' }}>
                            <TextField
                                type="date"
                                name="title"
                                //focused
                                onChange={handleChangeDateMeet}
                                //label="Date du rendez-vous"
                                required
                                value={dateMeet}
                                fullWidth
                                error={Boolean(dateMeetErr)}
                                helperText={dateMeetErr}
                            ></TextField>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ color: "black" }}
                    >
                        Fermer
                    </Button>
                    <Button
                        style={{ backgroundColor: "#ec407a", color: "white" }}
                        onClick={addMeeting}
                    >
                        Ajouter rendez-vous
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AjouterMeeting