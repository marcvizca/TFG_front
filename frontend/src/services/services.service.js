import axios from 'axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

//User

//Login function
export const postUserAuthByEmail = async (email, password) => {
    const response = await axios.post("http://localhost:8000/api/login" , 
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    return response;
}

//Logout function
export const getUserLoggedOut = async () => {
    const response = await axios.get("http://localhost:8000/api/logout",
        {
            withCredentials: true
        }
    );
    return response;
}

//SignUp
export const postSignUp = async (email, password, name, surname) => {
    const response = await axios.post("http://localhost:8000/api/register",
    { email, password, name, surname }
    );
    return response;
}

//Refresh Token
export const getRefreshToken = async () => {
    const response = await axios.get("http://localhost:8000/api/refresh",
        {
            withCredentials: true
        }
    );
    return response;
}

//Users
export const getUserByIdTeams = async (id) => {
    const response = await axios.get("http://localhost:8000/api/user/" + id + "/teams",
    {
        withCredentials: true
    });
    return response;
}

//Teams
export const getTeamName = async (id) => {
    const response = await axios.get("http://localhost:8000/api/team/" + id,
    {
        withCredentials: true
    });
    return response;
}

export const postTeam = async (userId, teamName, sport) => {
    const response = await axios.post("http://localhost:8000/api/team/create",
    {userId, teamName, sport}
    );
    return response;
}

//Members
export const getTeamMember = async (userId, teamId) => {
    const response = await axios.get("http://localhost:8000/api/members", {
    params: {
        userId: userId,
        teamId: teamId
    }
    });
    console.log("RESP:", response);
    return response;
}

//polls
export const postRpeTest = async (userId, teamId, rpe) => {
    const response = await axios.post("http://localhost:8000/api/poll/rpe",
    {userId, teamId, rpe}
    );
    return response;
}

export const postWellnessTest = async (userId, teamId, data) => {
    const response = await axios.post("http://localhost:8000/api/poll/wellness",
    {userId, teamId, data}
    );
    return response;
}