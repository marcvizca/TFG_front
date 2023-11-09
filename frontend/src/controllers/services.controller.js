import { postUserAuthByEmail, getUserLoggedOut, getRefreshToken, postSignUp, getUserByIdTeams, getTeamName, postTeam, getTeamMember, postRpeTest, postWellnessTest } from '../services/services.service.js'

//Login function
export const postUserAuth = async (email, password) => {
    const { data } = await postUserAuthByEmail(email, password)
    return data;
}

//Logout function
export const logOutUser = async () => {
    const { data } = await getUserLoggedOut();
    return data;
}

//Sign up
export const postNewUser = async (email, password, name, surname) => {
    const { data } = await postSignUp(email, password, name, surname);
    return data;
}

//Refresh Token

export const refreshToken = async() => {
    const { data } = await getRefreshToken();
    return data;
}


//Users
export const getUserTeams = async (id) => {
    const { data } = await getUserByIdTeams(id);
    return data;
}

//Teams
export const getTeamById = async (id) => {
    const { data } = await getTeamName(id);
    return data;
}

export const createTeam = async (userId, teamName, sport) => {
    const { data } = await postTeam(userId, teamName, sport);
    return data;
}

//Members
export const getMemberInfo = async (userId, teamId) => {
    const { data } = await getTeamMember(userId, teamId);
    return data;
}

//Polls
export const postRpe = async(userId, teamId, rpe) => {
    const { data } = await postRpeTest(userId, teamId, rpe);
    return data;
}

export const postWellness = async(userId, teamId, answers) => {
    const { data } = await postWellnessTest(userId, teamId, answers);
    return data;
}