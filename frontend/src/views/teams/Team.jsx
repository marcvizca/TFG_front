import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth.js';
import { getMemberInfo } from "../../controllers/services.controller.js";

function Team() {
    const { auth } = useAuth();
    const [isTrainer, setIsTrainer] = useState(false);
    const { teamId } = useParams();

    useEffect(() => {
        const getUserInfo = async() => {
            try {
                const response = await getMemberInfo(auth.userId, teamId);
                setIsTrainer(response.is_trainer);
            } catch(error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, []);

    return (
        <div>
            <Container component="main" maxWidth="sm">
            <CssBaseline />
        { isTrainer ? (
            <p>Es Entrenador</p>
        ) : (
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Link to='wellness'>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className="app-button"
                        >
                            Wellness
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={10}>
                    <Link to='rpe'>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className="app-button"
                        >
                            RPE
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )}
        </Container>
        </div>
        
    )
}

export default Team;