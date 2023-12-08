import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth.js';
import { getMemberInfo, registerMinuts, getMembersJoining, postMemberJoinTeam, denyMemberPendent } from "../../controllers/services.controller.js";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { showNotification } from '../../components/showNotification'
import { parse, format } from 'date-fns';
import { getMembersPendents } from "../../services/services.service.js";

function Team() {
    const { auth } = useAuth();
    const [isTrainer, setIsTrainer] = useState(false);
    const { teamId } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [minuts, setMinuts] = useState(undefined);
    const [membersPendents, setMembersPendents] = useState([]);
    const navigate = useNavigate();

    //Player section
    useEffect(() => {
        const getMembersPendents = async () => {
            try {
                const response = await getMembersJoining(teamId);
                console.log(response);
                setMembersPendents(response);
            } catch (error) {
                console.log(error);
            }
        }

        const getUserInfo = async() => {
            try {
                const response = await getMemberInfo(auth.userId, teamId);
                setIsTrainer(response.is_trainer);

                if (response.is_trainer) {
                    getMembersPendents();
                }
            } catch(error) {
                console.log(error);
            }
        };
        getUserInfo();



        const storedNotification = localStorage.getItem('NOTIFICATION');
        if (storedNotification) {
            const message = JSON.parse(storedNotification);
            showNotification(message);
            localStorage.removeItem('NOTIFICATION')
        }
    }, []);

    //Trainer section
    const handleDateChange = async (newDate) => {
        await setSelectedDate(newDate);
    }

    const handleSubmit = async () => {
        if (selectedDate) {
            if (minuts) {
                try {
                    //Comprovar que els minuts siguin positius i majors de 0
                    const dateFormated = format(new Date(selectedDate), 'yyyy-MM-dd');
                    const response = await registerMinuts(teamId, dateFormated, minuts);
                    localStorage.setItem('NOTIFICATION', JSON.stringify(response.success));
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            } else showNotification('Enter a valid number of minuts', 'failure')
        }
        else showNotification('Enter a date', 'failure');
    };

    const handleAccept = async (member) => {
        const response = await postMemberJoinTeam(member.user_id, member.team_id, member.number, member.position);
        const membersPend = await getMembersJoining();
        setMembersPendents(membersPend);
        //fer notificacio
    }
    const handleDeny = async (member) => {
        const response = await denyMemberPendent(member.user_id, member.team_id);
        console.log(response);
        const membersPend = await getMembersJoining();
        setMembersPendents(membersPend);
        //provarla
    }

//<Container component="main" maxWidth="sm">
    return (
        <div>
            <CssBaseline />
        { isTrainer ? (
            <div style={{display:'flex'}}>
                <div style={{alignItems: 'center', marginTop:'30px', justifyContent:'center', marginLeft:'auto'}}>
                    <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '4px'}}>
                        <h2>Registrar minutos de entreno</h2>
                        <label>Registra los minutos de entreno por dia del equipo para poder generar más datos</label>
                        <div style={{marginTop:'10px'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Selecciona una fecha"
                                value={selectedDate}
                                onChange={handleDateChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        "&:hover fieldset": {
                                            borderColor: "orange !important",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "orange !important",
                                        },
                                    },
                                    '& label.Mui-focused': {
                                        color: 'orange',
                                      },
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth  />}
                            />
                        </LocalizationProvider>
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Minutos entrenados"
                                value={minuts}
                                onChange={(e) => setMinuts(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        "&:hover fieldset": {
                                            borderColor: "orange !important",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "orange !important",
                                        },
                                    },
                                    '& label.Mui-focused': {
                                        color: 'orange',
                                      },
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                >
                                Enviar
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Link to='data'>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className="data-button"
                            >
                                Go to Team Data
                            </Button>
                        </Link>
                    </div>
                </div>
                <div style={{ justifyContent:'flex-end', marginLeft: 'auto'}}>
                        <div style={{width:'fit-content', overflowY: 'auto', backgroundColor: 'rgb(252, 193, 84)', marginLeft: 'auto'}}>
                            <h4>Solicitudes Pendientes:</h4>
                            {membersPendents.length > 0 ? ( 
                        <ul style={{ listStyleType: 'none', padding: 5 }}>
                            {membersPendents.map((member) => (
                            <li
                                key={`${member.name}-${member.surname}`}
                                style={{ cursor: 'pointer', padding: '5px', marginBottom: '5px', border: '1px solid black' }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px'}}>
                                {`${member.name} ${member.surname.slice(0, 10)}${member.surname.length > 10 ? '...' : ''}`}
                                    <div style={{alignContent:'flex-end !important'}}>
                                        <Button className="pendingMember_accept_button" onClick={() => handleAccept(member)}>Aceptar</Button>
                                        <Button className="pendingMember_deny_button" onClick={() => handleDeny(member)}>Denegar</Button>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                        ):(<text>No hay solicitudes pendientes</text>)}
                        </div>
                </div>
            </div>
        ) : (
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop:'30px'}}>
                <div>
                    <Link to='wellness'>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width:'400px'}}
                            className="app-button"
                        >
                            Wellness
                        </Button>
                    </Link>
                </div>
                <div style={{marginTop:'30px'}}>
                    <Link to='rpe'>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width:'400px'}}
                            className="app-button"
                        >
                            RPE
                        </Button>
                    </Link>
                </div>
            </div>
        )}
        
        </div>
        
    )
}

export default Team;