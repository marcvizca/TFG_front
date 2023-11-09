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
import { createTeam } from "../../controllers/services.controller";
import './teams.css'
import '../general.css'

const options = ["Football", "Field hockey", "Swimming", "Atheltism"];

function CreateTeam() {
  const [teamData, setTeamData] = useState({
    team:'',
    sport:'',
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    const userId = localStorage.getItem('userId')
    const response = createTeam(userId, teamData.team, teamData.sport);
    navigate('/teams');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <img src={LogoSample} alt="Logo" />
        
        <Typography component="h1" variant="h5">
          Create Team
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="team_name"
                label="Team name"
                name="team"
                value={teamData.team}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="sport">Sport</InputLabel>
              <Select
                  required
                  fullWidth
                  name="sport"
                  id="sport"
                  value={teamData.sport}
                  onChange={handleChange}
              >
                  {options.map((option, index) => (
                      <MenuItem key={index} value={option}> { option } </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="app-button"
          >
            Create Team
          </Button>
          
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default CreateTeam;