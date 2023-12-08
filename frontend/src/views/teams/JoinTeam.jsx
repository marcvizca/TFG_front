import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select } from "@mui/material";
import LogoSample from '../../assets/LogoSample.jpg';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { width } from "@mui/system";
import { joinTeam } from "../../controllers/services.controller";
import { showNotification } from '../../components/showNotification'

function JoinTeam() {
    const navigate = useNavigate();
    const defaultTheme = createTheme();
    const [teamCode, setTeamCode] = useState();
    const [playerNumber, setPlayerNumber] = useState();
    const [playerPosition, setPlayerPosition] = useState();
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        if (teamCode) {
            if (playerNumber && playerNumber >= 0) {
                if (playerPosition) {
                    e.preventDefault();
                    const result = await joinTeam(teamCode, userId, playerNumber, playerPosition);
                    showNotification(result.message); //gestionar el mostrar errors que provenen de la DB.
                    navigate('/teams');
                } else showNotification("Enter a valid position", "error");
            } else showNotification("Enter a valid number", "error");
        } else showNotification("Enter a valid code", "error");
      };

    const handleChangeCode = (e) => {
        setTeamCode(e.target.value);
    }
    const handleChangeNumber = (e) => {
        setPlayerNumber(e.target.value);
    }
    const handleChangePosition = (e) => {
        setPlayerPosition(e.target.value);
    }

    return(
        <div>
            <AiOutlineArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginTop: '10px', marginLeft:'10px', fontSize: '24px' }} />
            <ThemeProvider theme={defaultTheme}>
            <div style={{display: 'flex', flexDirection:'column', gap: '20px', alignItems: 'center', marginTop: '20px'}}>
            <CssBaseline />
            <Box
                sx={{
                width: '500px',
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <img src={LogoSample} alt="Logo" />
                
                <Typography component="h1" variant="h5">
                Join Team
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <div style={{display: 'flex', flexDirection:'column', gap: '20px', alignItems: 'center', marginTop: '20px'}}>
                    <Grid item sm={12}>
                        <TextField
                            required
                            id="team_code"
                            label="Insert the Team Code"
                            name="team_code"
                            value={teamCode}
                            onChange={handleChangeCode}
                            sx={{width:400}}
                        />
                    </Grid>
                    <div>
                    <Grid item sm={12}>
                        <TextField
                            required
                            id="player_number"
                            type="number"
                            label="Team Number"
                            name="player_number"
                            value={playerNumber}
                            onChange={handleChangeNumber}
                            sx={{mt: 2, mb: 2, width:180}}
                        />
                        <TextField
                            required
                            id="player_position"
                            label="Position"
                            name="player_position"
                            value={playerPosition}
                            onChange={handleChangePosition}
                            sx={{mt: 2, mb: 2, ml:5, width:180}}
                        />
                    </Grid>
                    </div>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: 400 }}
                    className="app-button"
                >
                    Join Team
                </Button>
                
                </Box>
            </Box>
            </div>
            </ThemeProvider>
        </div>
    )
}

export default JoinTeam;