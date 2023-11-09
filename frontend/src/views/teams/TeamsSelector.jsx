import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom" ;
import Button from '@mui/material/Button';
import useAuth from '../../hooks/useAuth.js';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { Select } from "@mui/material";
import LogoSample from '../../assets/LogoSample.jpg'
import { getUserTeams, getTeamById } from "../../controllers/services.controller.js";
import './teams.css'
import '../general.css'

function Teams () {

    const [teams, setTeams] = useState({});
    const { auth } = useAuth();

    useEffect( () => {
        const getTeams = async() => {
            const response = await getUserTeams(auth.userId);
            const userTeams = await Promise.all(
                response.map(async (item) =>  {
                    const teamId = item.team_id;
                    const resp = await getTeamById(teamId);
                    const teamName = resp.name;

                    return {
                        teamId: teamId,
                        teamName: teamName
                    };
                })
                );
            setTeams(userTeams);
        };
        getTeams();
    }, [])

    return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Grid container spacing={2}>
    {teams.length > 0 ? (
    teams.map((team, index) =>  (
      <Grid item xs={6} key={index}>
        <Link to={`/team/${team.teamId}`}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="app-button"
          >
            {team.teamName}
          </Button>
        </Link>
      </Grid>
    ))
    ) : (
        <p> Loading...</p>
    )} 
    </Grid>
    <div className="create-button-container">
    <Grid spacing={2}>
      <Grid item xs={6}>
        <Link to="/createteam">
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="create-button"
          >
            Create Team
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/jointeam">
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="create-button"
          >
            Join Team
          </Button>
        </Link>
      </Grid>
    </Grid>
    </div>
  </Container>
    )
}

export default Teams;