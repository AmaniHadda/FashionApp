import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, Typography } from '@mui/material';

function CalendarMeeting() {
    const localizer = momentLocalizer(moment)
    const [meeting, setMeeting] = useState([]);
    const [rdv, setRdv] = useState({});
    const [rdvv, setRdvv] = useState({});
    const [modalShow, setModalShow] = useState(false)
    const history = useHistory()
    const getMeeting = async () => {
        try {
            const response = await axios.get("/api/meetings/");
            const data = response.data;
            setMeeting(response.data.meetings);
        } catch (error) {
            console.log(error);
        }
    };

    const DetailsEvent = async (e) => {
        setRdv(e)
        setRdvv(e.contenu)
        setModalShow(true);
    };

    const events = meeting?.map((e) => {
        return {
            title: "RDV " + e.userId?.name + " \n Contacts: " + e.userId?.phone + " / " + e.userId?.email,
            start: new Date(e.date),
            end: new Date(e.date),
            color: "pink",
            contenu: e
        }
    })
    useEffect(() => {
        getMeeting();
    }, [rdv]);
    return (
        <div className="profile_page">
            <div className="col-left"></div>
            <div className="col-right">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="col-md-8" >
                        <h1 style={{ fontSize: "1.7rem", color: "black", margin: "10px 0" }}>
                            Mes Rendez-Vous
                        </h1>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                    <Button  onClick={() => history.push("/rendezvous")} style={{ backgroundColor: "pink", color: "white" }} >Retour</Button>
                    </div>
                </div>
                <div style={{ marginTop: 20 + "px" }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor={"start"}
                        endAccessor={"end"}
                        style={{ height: 500 }}
                        eventPropGetter={(event) => {
                            return {
                                style: {
                                    backgroundColor: event.color
                                }
                            }
                        }}
                        onSelectEvent={(e) => DetailsEvent(e)}
                    />
                    <Dialog open={modalShow} onClose={() => setModalShow(false)} maxWidth="md" fullWidth>
                        <DialogTitle style={{ color: '#ec407a' }}> {rdv.title}</DialogTitle>
                        {rdv ? (
                            <DialogContent>
                                <div className="row">
                                    <div className="coach-details">
                                        <Typography variant="h6" >
                                            <strong>Détails du Rendez-vous</strong>
                                        </Typography>                                    
                                        <div>
                                            <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
                                                <p style={{ fontSize: '1rem', marginRight: "15px", fontWeight:"bold" }}>
                                                    Type d'événement:
                                                </p>{' '}
                                                {rdvv.eventType}
                                            </Typography>
                                        </div>
                                        <div>
                                           {rdvv.habillements?.length !==0 && <Typography variant="body1">
                                                <p style={{ fontSize: '1rem', marginRight: "15px",  fontWeight:"bold" }}>
                                                    Habillements:
                                                </p>{' '}
                                                <div className="">
                                                    <Table striped bordered hover responsive style={{ width: "700px" }}>
                                                        <thead>
                                                            <tr>
                                                                <th >Image</th>
                                                                <th>Nom de l'article</th>
                                                                <th >Prix</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rdvv.habillements?.map((r) => (
                                                                <tr key={r._id} className="table-row">
                                                                    <td className="table-cell" style={{ textAlign: "center" }}>
                                                                        <img
                                                                            src={` ${process.env.REACT_APP_URL_UPLOAD}/habillements/${r.img}`}
                                                                            height={60}
                                                                            width={60}
                                                                        />
                                                                    </td>
                                                                    <td className="table-cell" style={{ textAlign: "center" }}>{r.name}</td>
                                                                    <td className="table-cell" style={{ textAlign: "center" }}>{r.price} TND</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Typography>}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        ) : (<div>hi</div>)}




                        <DialogActions>
                            <Button  onClick={() => setModalShow(false)}  style={{ backgroundColor: "#ec407a", color: "white" }} >Fermer</Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </div></div>
    )
}

export default CalendarMeeting